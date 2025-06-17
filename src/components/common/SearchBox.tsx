/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../styles/theme';
import { Typography } from './Typography';
import { Icon } from './Icon';
import { SearchInput } from './SearchInput';
import { Dropdown } from './Dropdown';
import type { SearchInputRef } from './SearchInput';
import { useSearchHistory } from '../../hooks/useSearchHistory';

interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string, target?: 'title' | 'person' | 'publisher') => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = '검색어를 입력하세요',
  value = '',
  onChange,
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isDetailSearchVisible, setIsDetailSearchVisible] = useState(false);
  const [detailSearchQuery, setDetailSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('제목');
  const inputRef = useRef<SearchInputRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { searchHistory, addSearchTerm, removeSearchTerm } = useSearchHistory();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setInputValue(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  const executeSearch = useCallback(
    (query: string) => {
      const trimmedQuery = query.trim();
      if (trimmedQuery) {
        addSearchTerm(trimmedQuery);
        onSearch?.(trimmedQuery);
      }
      setIsDropdownVisible(false);
    },
    [addSearchTerm, onSearch]
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        executeSearch(inputValue);
      } else if (e.key === 'Escape') {
        setIsDropdownVisible(false);
      }
    },
    [executeSearch, inputValue]
  );

  const handleFocus = useCallback(() => {
    if (searchHistory.length > 0) {
      setIsDropdownVisible(true);
    }
  }, [searchHistory.length]);

  const handleBlur = useCallback(() => {
    // 드롭다운 아이템 클릭을 위한 지연
    setTimeout(() => setIsDropdownVisible(false), 150);
  }, []);

  const handleHistoryItemClick = useCallback(
    (term: string) => {
      setInputValue(term);
      executeSearch(term);
    },
    [executeSearch]
  );

  const handleRemoveHistoryItem = useCallback(
    (e: React.MouseEvent, term: string) => {
      e.stopPropagation();
      removeSearchTerm(term);
    },
    [removeSearchTerm]
  );

  const handleDetailSearch = () => {
    setIsDetailSearchVisible(!isDetailSearchVisible);
  };

  const handleDetailSearchSubmit = () => {
    const trimmedQuery = detailSearchQuery.trim();
    if (trimmedQuery) {
      // 드롭다운 값을 API target 값으로 매핑
      const targetMapping = {
        제목: 'title' as const,
        저자: 'person' as const,
        출판사: 'publisher' as const,
      };

      const target = targetMapping[searchType as keyof typeof targetMapping];
      onSearch?.(trimmedQuery, target);
      setIsDetailSearchVisible(false);
    }
  };

  const handleDetailSearchClose = () => {
    setIsDetailSearchVisible(false);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasSearchHistory = searchHistory.length > 0;
  const showDropdown = isDropdownVisible && hasSearchHistory;

  return (
    <div ref={containerRef} css={searchBoxContainerStyles}>
      {/* 제목 */}
      <Typography variant="title2" color="black" css={titleStyles}>
        도서 검색
      </Typography>

      {/* 검색 영역 */}
      <div css={searchGroupStyles}>
        <SearchInput
          ref={inputRef}
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={handleFocus}
          onClick={handleFocus}
          onBlur={handleBlur}
          showDropdown={showDropdown}
        />

        <div css={detailSearchButtonContainerStyles}>
          <button css={detailSearchButtonStyles} onClick={handleDetailSearch}>
            <Typography variant="body2" color="subtitle">
              상세검색
            </Typography>
          </button>

          {/* 상세 검색 팝업 */}
          {isDetailSearchVisible && (
            <div css={detailSearchPopupStyles}>
              <button css={closeButtonStyles} onClick={handleDetailSearchClose}>
                <Icon
                  name="close"
                  size={20}
                  color={theme.colors.text.subtitle}
                />
              </button>

              <div css={detailSearchContentStyles}>
                <Dropdown
                  options={[
                    { value: '제목', label: '제목' },
                    { value: '저자', label: '저자' },
                    { value: '출판사', label: '출판사' },
                  ].filter(option => option.value !== searchType)}
                  value={searchType}
                  onChange={setSearchType}
                />

                <div css={detailInputContainerStyles}>
                  <input
                    css={detailInputStyles}
                    type="text"
                    placeholder="검색어 입력"
                    value={detailSearchQuery}
                    onChange={e => setDetailSearchQuery(e.target.value)}
                    onKeyDown={e =>
                      e.key === 'Enter' && handleDetailSearchSubmit()
                    }
                  />
                </div>
              </div>

              <button
                css={searchSubmitButtonStyles}
                onClick={handleDetailSearchSubmit}
              >
                검색하기
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 검색 기록 드롭다운 */}
      {showDropdown && (
        <div css={searchHistoryDropdownStyles}>
          {searchHistory.map((term, index) => (
            <div
              key={`${term}-${index}`}
              css={historyItemStyles}
              onClick={() => handleHistoryItemClick(term)}
            >
              <span css={historyTermStyles}>{term}</span>
              <button
                css={removeButtonStyles}
                onClick={e => handleRemoveHistoryItem(e, term)}
                onMouseDown={e => e.preventDefault()}
                aria-label={`${term} 삭제`}
              >
                <Icon name="close" size={24} color={theme.colors.black} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const searchBoxContainerStyles = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const titleStyles = css`
  align-self: flex-start;
`;

const searchGroupStyles = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const detailSearchButtonContainerStyles = css`
  position: relative;
`;

const detailSearchButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 36px;
  color: ${theme.colors.text.subtitle};
  border: 1px solid ${theme.colors.text.subtitle};
  border-radius: 8px;
  background-color: ${theme.colors.white};
  cursor: pointer;
  transition: all ${theme.transitions.fast};
`;

const searchHistoryDropdownStyles = css`
  position: absolute;
  top: 100%;
  left: 0;
  width: 480px;
  background-color: ${theme.colors.lightGray};
  border-radius: 0 0 24px 24px;
  z-index: ${theme.zIndex.dropdown};
  max-height: 300px;
  overflow-y: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const historyItemStyles = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  cursor: pointer;
  transition: background-color ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.white};
  }
`;

const historyTermStyles = css`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.text.subtitle};
`;

const removeButtonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  border-radius: 50%;
  transition: background-color ${theme.transitions.fast};
  * {
    cursor: pointer;
  }

  &:hover {
    background-color: ${theme.colors.surface};
  }
`;

const detailSearchPopupStyles = css`
  position: absolute;
  top: calc(100% + 15px);
  left: 50%;
  transform: translateX(-50%);
  width: 360px;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 4px 14px 6px rgba(151, 151, 151, 0.15);
  z-index: ${theme.zIndex.modal};
  padding: 0;
`;

const closeButtonStyles = css`
  position: absolute;
  top: 8px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  border-radius: 50%;
  transition: background-color ${theme.transitions.fast};
  * {
    cursor: pointer;
  }

  &:hover {
    background-color: ${theme.colors.surface};
  }
`;

const detailSearchContentStyles = css`
  padding: 36px 24px 24px;
  display: flex;
  align-items: flex-end;
  gap: 4px;
`;

const detailInputContainerStyles = css`
  width: 208px;
`;

const detailInputStyles = css`
  width: 100%;
  height: 36px;
  padding: 8px 12px;
  border: none;
  border-bottom: 1px solid ${theme.colors.gray};
  background-color: transparent;
  font-family: ${theme.typography.fontFamily};
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.text.primary};

  &:focus {
    outline: none;
    border-bottom: 1px solid ${theme.colors.primary};
  }

  &::placeholder {
    color: ${theme.colors.text.subtitle};
  }
`;

const searchSubmitButtonStyles = css`
  width: 312px;
  height: 36px;
  margin: 0 24px 24px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: 8px;
  font-family: ${theme.typography.fontFamily};
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.primary};
    opacity: 0.9;
  }
`;

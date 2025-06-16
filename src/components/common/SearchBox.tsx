/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../styles/theme';
import { Typography } from './Typography';
import { Icon } from './Icon';

interface SearchBoxProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onDetailSearch?: () => void;
}

export const SearchBox = ({
  placeholder = '검색어를 입력하세요',
  value = '',
  onChange,
  onSearch,
  onDetailSearch,
}: SearchBoxProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch?.(inputValue);
    }
  };

  return (
    <div css={searchBoxContainerStyles}>
      <div css={titleStyles}>
        <Typography variant="title2" color="black">
          도서 검색
        </Typography>
      </div>

      <div css={searchGroupStyles}>
        <div css={searchInputContainerStyles}>
          <div css={searchIconContainerStyles}>
            <Icon name="search" size={24} color={theme.colors.text.primary} />
          </div>
          <input
            css={searchInputStyles}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
          />
        </div>

        <button css={detailSearchButtonStyles} onClick={onDetailSearch}>
          <Typography variant="body2" color="subtitle">
            상세검색
          </Typography>
        </button>
      </div>
    </div>
  );
};

const searchBoxContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const titleStyles = css`
  align-self: flex-start;
`;

const searchGroupStyles = css`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
`;

const searchInputContainerStyles = css`
  display: flex;
  align-items: center;
  width: 480px;
  height: 50px;
  background-color: ${theme.colors.lightGray};
  border-radius: 100px;
  padding: 10px;
  gap: 11px;
`;

const searchInputStyles = css`
  flex: 1;
  border: none;
  background: transparent;
  outline: none;
  font-family: ${theme.typography.fontFamily};
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.text.primary};

  &::placeholder {
    color: ${theme.colors.text.subtitle};
  }
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

  &:hover {
    border-color: ${theme.colors.primary};
    background-color: ${theme.colors.surface};
  }
`;

const searchIconContainerStyles = css`
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

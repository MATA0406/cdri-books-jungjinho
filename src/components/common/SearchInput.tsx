/** @jsxImportSource @emotion/react */
import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../styles/theme';
import { Icon } from './Icon';

interface SearchInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onClick?: () => void;
  onBlur?: () => void;
  showDropdown?: boolean;
}

export interface SearchInputRef {
  focus: () => void;
  blur: () => void;
}

export const SearchInput = forwardRef<SearchInputRef, SearchInputProps>(
  (
    {
      placeholder = '검색어를 입력하세요',
      value = '',
      onChange,
      onKeyDown,
      onFocus,
      onClick,
      onBlur,
      showDropdown = false,
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    }));

    return (
      <div css={searchInputContainerStyles(showDropdown)}>
        <Icon
          name="search"
          size={24}
          color={theme.colors.text.primary}
          css={searchIconStyles}
        />
        <input
          ref={inputRef}
          css={searchInputStyles}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
          onClick={onClick}
          onBlur={onBlur}
        />
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

// 스타일 정의
const searchInputContainerStyles = (showDropdown: boolean) => css`
  display: flex;
  align-items: center;
  width: 480px;
  height: 50px;
  background-color: ${theme.colors.lightGray};
  border-radius: ${showDropdown ? '24px 24px 0 0' : '100px'};
  padding: 10px;
  gap: 11px;
`;

const searchIconStyles = css`
  padding: 3px;
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

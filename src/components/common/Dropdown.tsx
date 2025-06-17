/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../styles/theme';
import { Icon } from './Icon';

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setIsFocused(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
    setIsFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div css={containerStyles} ref={containerRef}>
      <button
        css={triggerStyles(isFocused)}
        onClick={handleToggle}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <span css={labelStyles}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <Icon
          name="arrow-down"
          size={20}
          color={theme.colors.text.subtitle}
          css={arrowStyles(isOpen)}
        />
      </button>

      {isOpen && (
        <div css={dropdownStyles}>
          {options.map(option => (
            <button
              key={option.value}
              css={optionStyles}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const containerStyles = css`
  position: relative;
  width: 100px;
`;

const triggerStyles = (isFocused: boolean) => css`
  width: 100%;
  height: 36px;
  padding: 8px;
  border: none;
  border-bottom: 1px solid
    ${isFocused ? theme.colors.primary : theme.colors.gray};
  background-color: transparent;
  font-family: ${theme.typography.fontFamily};
  font-size: 14px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: border-bottom-color ${theme.transitions.fast};

  &:focus {
    outline: none;
  }
`;

const labelStyles = css`
  text-align: left;
  flex: 1;
`;

const arrowStyles = (isOpen: boolean) => css`
  transform: ${isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform ${theme.transitions.fast};
`;

const dropdownStyles = css`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: ${theme.colors.white};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  z-index: ${theme.zIndex.dropdown};
  border-radius: 0 0 4px 4px;
`;

const optionStyles = css`
  width: 100%;
  height: 30px;
  padding: 4px 8px;
  border: none;
  background-color: transparent;
  font-family: ${theme.typography.fontFamily};
  font-size: 14px;
  font-weight: 500;
  color: ${theme.colors.text.subtitle};
  cursor: pointer;
  text-align: left;
  transition: background-color ${theme.transitions.fast};

  &:hover {
    background-color: ${theme.colors.surface};
  }

  &:last-child {
    border-radius: 0 0 4px 4px;
  }
`;

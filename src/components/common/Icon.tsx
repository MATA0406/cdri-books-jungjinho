/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';

interface IconProps {
  name:
    | 'heart'
    | 'heart-filled'
    | 'arrow-right'
    | 'arrow-up'
    | 'arrow-down'
    | 'search'
    | 'close';
  size?: number;
  color?: string;
  className?: string;
  onClick?: () => void;
}

const iconStyles = (size: number, onClick?: () => void) => css`
  cursor: ${onClick ? 'pointer' : 'default'};
  display: flex;
  * {
    width: ${size}px !important;
    height: ${size}px !important;
  }
`;

export const Icon: React.FC<IconProps> = ({
  name,
  size = 16,
  color = '#8D94A0',
  className = '',
  onClick,
}) => {
  const renderIcon = () => {
    switch (name) {
      case 'search':
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'heart':
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              stroke={color}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        );
      case 'heart-filled':
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={color}
            />
          </svg>
        );
      case 'arrow-right':
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 18l6-6-6-6"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'arrow-up':
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 15l-6-6-6 6"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'arrow-down':
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9l6 6 6-6"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case 'close':
        return (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke={color}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      css={iconStyles(size, onClick)}
      className={className}
      onClick={onClick}
    >
      {renderIcon()}
    </div>
  );
};

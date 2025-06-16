// src/styles/global.ts
import { css } from '@emotion/react';

export const globalStyle = css`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Pretendard Variable', -apple-system, BlinkMacSystemFont, 
      'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.6;
    background-color: #ffffff;
    color: #212529;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    text-decoration: none;
    color: inherit;
    transition: color 0.2s ease;
  }

  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
    margin: 0;
    font-size: inherit;
    line-height: inherit;
    transition: all 0.2s ease;
  }

  input, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    border: none;
    outline: none;
    background: transparent;
  }

  ul, ol {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }

  /* 선택 영역 스타일링 */
  ::selection {
    background-color: #e3f2fd;
    color: #1976d2;
  }

  /* 포커스 스타일 */
  *:focus {
    outline: 2px solid #1976d2;
    outline-offset: 2px;
  }

  /* 접근성을 위한 포커스 표시 제거 (마우스 사용시) */
  *:focus:not(:focus-visible) {
    outline: none;
  }
`;
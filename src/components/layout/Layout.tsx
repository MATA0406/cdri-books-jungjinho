/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { theme } from '../../styles/theme';
import { Header } from './Header';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div css={layoutStyles}>
      <Header />
      <main css={contentStyles}>{children}</main>
    </div>
  );
};

const layoutStyles = css`
  min-height: 100vh;
  background-color: ${theme.colors.white};
`;

const contentStyles = css`
  display: flex;
  justify-content: center;
  padding-top: 80px;
  min-height: calc(100vh - 80px);
`;

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { theme } from '../../styles/theme';
import { Header } from './Header';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  activeNav?: 'search' | 'favorites';
  onNavChange?: (nav: 'search' | 'favorites') => void;
}

export const Layout = ({
  children,
  activeNav = 'search',
  onNavChange,
}: LayoutProps) => {
  return (
    <div css={layoutStyles}>
      <Header activeNav={activeNav} onNavChange={onNavChange} />
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
  padding-top: 160px;
  min-height: calc(100vh - 80px);
`;

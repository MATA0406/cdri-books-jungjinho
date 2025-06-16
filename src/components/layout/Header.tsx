/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { theme } from '../../styles/theme';
import { Typography } from '../common';

interface HeaderProps {
  activeNav?: 'search' | 'favorites';
}

export const Header = ({ activeNav = 'search' }: HeaderProps) => {
  return (
    <header css={headerStyles}>
      <div css={headerContentStyles}>
        <div css={logoStyles}>
          <Typography variant="title1" color="primary">
            CERTICOS BOOKS
          </Typography>
        </div>

        <nav css={navStyles}>
          <div
            css={activeNav === 'search' ? activeNavItemStyles : navItemStyles}
          >
            <Typography variant="body1" color="primary">
              도서 검색
            </Typography>
          </div>
          <div
            css={
              activeNav === 'favorites' ? activeNavItemStyles : navItemStyles
            }
          >
            <Typography variant="body1" color="primary">
              내가 찜한 책
            </Typography>
          </div>
        </nav>
      </div>
    </header>
  );
};

const headerStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: ${theme.colors.white};
  z-index: ${theme.zIndex.sticky};
`;

const headerContentStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  min-width: 1100px;
  margin: 0 auto;
`;

const logoStyles = css`
  margin-right: 400px;
  margin-left: 160px;
`;

const navStyles = css`
  display: flex;
  align-items: center;
  gap: 56px;
`;

const navItemStyles = css`
  position: relative;
  cursor: pointer;
  transition: color ${theme.transitions.fast};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const activeNavItemStyles = css`
  ${navItemStyles}

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: ${theme.colors.primary};
    bottom: -10px;
  }
`;

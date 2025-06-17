/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { SearchBox } from '../components/common';
import { BookList, LikedBooksList } from '../components/book';
import { Layout } from '../components/layout';
import { theme } from '../styles/theme';

export const BookSearchPage = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentTarget, setCurrentTarget] = useState<
    'title' | 'person' | 'publisher' | undefined
  >();
  const [searchValue, setSearchValue] = useState('');
  const [activeNav, setActiveNav] = useState<'search' | 'favorites'>('search');

  const handleNavChange = (nav: 'search' | 'favorites') => {
    setActiveNav(nav);
    if (nav === 'favorites') {
      setSearchValue('');
      setCurrentQuery('');
    }
  };

  const handleSearch = (
    query: string,
    target?: 'title' | 'person' | 'publisher'
  ) => {
    const searchQuery = query.trim();
    setCurrentQuery(searchQuery);
    setCurrentTarget(target);
    setSearchValue(searchQuery);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <Layout activeNav={activeNav} onNavChange={handleNavChange}>
      <div css={pageContainerStyles}>
        {activeNav === 'search' && (
          <>
            {/* 검색 섹션 */}
            <section css={searchSectionStyles}>
              <SearchBox
                placeholder="검색어를 입력하세요"
                value={searchValue}
                onChange={handleSearchChange}
                onSearch={handleSearch}
              />
            </section>

            <section css={contentSectionStyles}>
              <BookList query={currentQuery} target={currentTarget} />
            </section>
          </>
        )}

        {activeNav === 'favorites' && (
          <section css={favoritesSection}>
            <LikedBooksList />
          </section>
        )}
      </div>
    </Layout>
  );
};

const pageContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const searchSectionStyles = css`
  position: sticky;
  width: 960px;
  background-color: ${theme.colors.white};
  top: 36px;
  z-index: 10;
  box-shadow: 0 8px 16px -8px rgba(255, 255, 255, 0.8);
  &::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: 0;
    width: 100%;
    height: 30px;
    background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

const contentSectionStyles = css`
  padding: 24px 0;
  width: 960px;
`;

const favoritesSection = css`
  width: 960px;
`;

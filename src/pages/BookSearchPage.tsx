/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { SearchBox } from '../components/common';
import { BookList } from '../components/book/BookList';
import { theme } from '../styles/theme';

export const BookSearchPage = () => {
  const [currentQuery, setCurrentQuery] = useState('');
  const [currentTarget, setCurrentTarget] = useState<
    'title' | 'person' | 'publisher' | undefined
  >();
  const [searchValue, setSearchValue] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (
    query: string,
    target?: 'title' | 'person' | 'publisher'
  ) => {
    const searchQuery = query.trim();
    setCurrentQuery(searchQuery);
    setCurrentTarget(target);
    setSearchValue(searchQuery);
    setIsSearched(true);
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div css={pageContainerStyles}>
      {/* 검색 섹션 */}
      <section css={searchSectionStyles}>
        <SearchBox
          placeholder="검색어를 입력하세요"
          value={searchValue}
          onChange={handleSearchChange}
          onSearch={handleSearch}
        />
      </section>

      {/* 컨텐츠 섹션 */}
      {isSearched && (
        <section css={contentSectionStyles}>
          <BookList query={currentQuery} target={currentTarget} />
        </section>
      )}
    </div>
  );
};

const pageContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 960px;
`;

const searchSectionStyles = css`
  position: sticky;
  width: 100%;
  background-color: ${theme.colors.white};
  top: -60px;
  padding-top: 104px;
  padding-bottom: 16px;
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
  width: 100%;
`;

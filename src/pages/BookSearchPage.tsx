/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { SearchBox, NoData, SearchCountText } from '../components/common';

export const BookSearchPage = () => {
  const [searchResults, setSearchResults] = useState<unknown[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleSearch = (query: string) => {
    console.log('검색어:', query);
    setIsSearched(true);
    // TODO: 실제 검색 API 호출
    setSearchResults([]);
  };

  const handleDetailSearch = () => {
    console.log('상세검색 클릭');
    // TODO: 상세검색 모달 또는 페이지 이동
  };

  return (
    <div css={pageContainerStyles}>
      {/* 검색 섹션 */}
      <section css={searchSectionStyles}>
        <SearchBox
          placeholder="검색어를 입력하세요"
          onSearch={handleSearch}
          onDetailSearch={handleDetailSearch}
        />
      </section>

      {/* 컨텐츠 섹션 */}
      {isSearched && (
        <section css={contentSectionStyles}>
          {/* 검색 결과 개수 */}
          <div css={searchCountSectionStyles}>
            <SearchCountText
              title="도서 검색 결과"
              count={searchResults.length}
            />
          </div>

          {/* 검색 결과 또는 NoData */}
          {searchResults.length === 0 ? (
            <div css={noDataSectionStyles}>
              <NoData message="검색된 결과가 없습니다." />
            </div>
          ) : (
            <div>
              {/* TODO: 검색 결과 리스트 컴포넌트 */}
              <div>검색 결과가 여기에 표시됩니다.</div>
            </div>
          )}
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
  padding-top: 104px;
`;

const contentSectionStyles = css`
  padding: 24px 0;
  width: 100%;
`;

const searchCountSectionStyles = css`
  margin-bottom: 24px;
`;

const noDataSectionStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
`;

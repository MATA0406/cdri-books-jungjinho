/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useCallback } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../styles/theme';
import { BookListItem } from './BookListItem';
import { NoData } from '../common/NoData';
import { Typography } from '../common/Typography';
import { useInfiniteBookSearch } from '../../hooks/useInfiniteBookSearch';
import { useLikedBooks } from '../../hooks/useLikedBooks';
import type { Book } from '../../types/book';

export const BookList: React.FC<BookListProps> = ({ query, target }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteBookSearch({
    query,
    target,
    enabled: Boolean(query?.trim()),
  });

  const { toggleLike, isLiked } = useLikedBooks();
  const intersectionRef = useRef<HTMLDivElement>(null);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage, isFetchingNextPage]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
    });

    const currentTarget = intersectionRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [handleIntersection]);

  // 로딩 상태
  if (isLoading) {
    return (
      <div css={containerStyles}>
        <div css={loadingStyles}>
          <Typography variant="body1" color="subtitle">
            검색 중...
          </Typography>
        </div>
      </div>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <div css={containerStyles}>
        <div css={errorStyles}>
          <Typography variant="body1" color="error">
            검색 중 오류가 발생했습니다: {error?.message}
          </Typography>
        </div>
      </div>
    );
  }

  const totalCount = data?.pages[0].meta.total_count;
  const allBooks = data?.pages.flatMap(page => page.documents);

  return (
    <div css={containerStyles}>
      <div css={searchResultsStyles}>
        <Typography variant="caption" color="primary">
          도서 검색 결과 총&nbsp;
        </Typography>
        <Typography variant="caption" color="colorPrimary">
          {totalCount?.toLocaleString() || 0}
        </Typography>
        <Typography variant="caption" color="primary">
          건
        </Typography>
      </div>

      {!data && (
        <div css={containerStyles}>
          <NoData message="검색 결과가 없습니다." />
        </div>
      )}

      <div>
        {allBooks?.map((book: Book, index: number) => (
          <BookListItem
            key={`${book.isbn}-${index}`}
            book={book}
            isLiked={isLiked(book.isbn)}
            onToggleLike={toggleLike}
          />
        ))}
      </div>

      <div ref={intersectionRef} css={intersectionTargetStyles} />

      {isFetchingNextPage && (
        <div css={loadingStyles}>
          <Typography variant="body2" color="subtitle">
            더 많은 결과를 불러오는 중...
          </Typography>
        </div>
      )}
    </div>
  );
};

interface BookListProps {
  query: string;
  target?: 'title' | 'person' | 'publisher';
}

const containerStyles = css`
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
`;

const searchResultsStyles = css`
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
`;

const loadingStyles = css`
  text-align: center;
  padding: ${theme.spacing.xl};
`;

const errorStyles = css`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.error};
`;

const intersectionTargetStyles = css`
  height: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0;
`;

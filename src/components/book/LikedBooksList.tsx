/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../styles/theme';
import { BookListItem } from './BookListItem';
import { NoData } from '../common/NoData';
import { Typography } from '../common/Typography';
import { useLikedBooks } from '../../hooks/useLikedBooks';
import type { Book } from '../../types/book';

const ITEMS_PER_PAGE = 10;

export const LikedBooksList: React.FC = () => {
  const { getLikedBooks, toggleLike, isLiked } = useLikedBooks();
  const likedBooks = getLikedBooks();

  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const intersectionRef = useRef<HTMLDivElement>(null);

  const displayedBooks = likedBooks.slice(0, displayedCount);
  const hasMore = displayedCount < likedBooks.length;

  const loadMore = useCallback(() => {
    if (hasMore) {
      setDisplayedCount(prev =>
        Math.min(prev + ITEMS_PER_PAGE, likedBooks.length)
      );
    }
  }, [hasMore, likedBooks.length]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore) {
        loadMore();
      }
    },
    [loadMore, hasMore]
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

  // 찜한 책 목록이 변경될 때 displayedCount 초기화
  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE);
  }, [likedBooks.length]);

  return (
    <div css={containerStyles}>
      <div css={headerContainerStyles}>
        <Typography variant="title2" color="primary">
          찜한 책
        </Typography>
        <div css={headerStyles}>
          <Typography variant="caption" color="primary">
            찜한 책 총&nbsp;
          </Typography>
          <Typography variant="caption" color="colorPrimary">
            {likedBooks.length.toLocaleString()}
          </Typography>
          <Typography variant="caption" color="primary">
            건
          </Typography>
        </div>
      </div>

      {likedBooks.length === 0 && <NoData message="찜한 책이 없습니다." />}

      <div>
        {displayedBooks.map((book: Book, index: number) => (
          <BookListItem
            key={`${book.isbn}-${index}`}
            book={book}
            isLiked={isLiked(book.isbn)}
            onToggleLike={toggleLike}
          />
        ))}
      </div>

      {/* 무한 스크롤 트리거 */}
      {hasMore && <div ref={intersectionRef} css={intersectionTargetStyles} />}

      {/* 로딩 표시 */}
      {hasMore && displayedCount > ITEMS_PER_PAGE && (
        <div css={loadingStyles}>
          <Typography variant="body2" color="subtitle">
            더 많은 찜한 책을 불러오는 중...
          </Typography>
        </div>
      )}
    </div>
  );
};

const containerStyles = css`
  width: 100%;
  width: 960px;
`;

const headerContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${theme.spacing.lg};
`;

const headerStyles = css`
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
`;

const intersectionTargetStyles = css`
  height: ${theme.spacing.md};
  margin: ${theme.spacing.md} 0;
`;

const loadingStyles = css`
  text-align: center;
  padding: ${theme.spacing.xl};
`;

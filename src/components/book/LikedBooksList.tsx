/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { theme } from '../../styles/theme';
import { BookListItem } from './BookListItem';
import { NoData } from '../common/NoData';
import { Typography } from '../common/Typography';
import { useLikedBooks } from '../../hooks/useLikedBooks';
import type { Book } from '../../types/book';

export const LikedBooksList: React.FC = () => {
  const { getLikedBooks, toggleLike, isLiked } = useLikedBooks();
  const likedBooks = getLikedBooks();

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
        {likedBooks.map((book: Book, index: number) => (
          <BookListItem
            key={`${book.isbn}-${index}`}
            book={book}
            isLiked={isLiked(book.isbn)}
            onToggleLike={toggleLike}
          />
        ))}
      </div>
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

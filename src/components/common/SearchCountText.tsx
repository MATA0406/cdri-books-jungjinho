/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Typography } from './Typography';
import { theme } from '../../styles/theme';

interface SearchCountTextProps {
  title?: string;
  count: number;
}

export const SearchCountText = ({
  title = '도서 검색 결과',
  count,
}: SearchCountTextProps) => {
  return (
    <div css={searchCountContainerStyles}>
      <Typography variant="caption" color="primary">
        {title}
      </Typography>
      <Typography variant="caption" color="primary">
        총{' '}
        <Typography variant="caption" color="primary" css={countStyles}>
          {count.toLocaleString()}
        </Typography>
        건
      </Typography>
    </div>
  );
};

const searchCountContainerStyles = css`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const countStyles = css`
  color: ${theme.colors.primary};
`;

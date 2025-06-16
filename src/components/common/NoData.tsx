/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import { Typography } from './Typography';
import iconBook from '../../assets/icon_book.png';
import styled from '@emotion/styled';

interface NoDataProps {
  message?: string;
  icon?: React.ReactNode;
}

export const NoData = ({
  message = '검색된 결과가 없습니다.',
}: NoDataProps) => {
  return (
    <div css={noDataContainerStyles}>
      <div css={iconContainerStyles}>
        <Image src={iconBook} alt="no-data" width={80} height={80} />
      </div>
      <div css={messageStyles}>
        <Typography variant="caption" color="secondary">
          {message}
        </Typography>
      </div>
    </div>
  );
};

const noDataContainerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 160px;
  height: 120px;
  margin: 0 auto;
`;

const iconContainerStyles = css`
  margin-bottom: 24px;
`;

const messageStyles = css`
  text-align: center;
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
`;

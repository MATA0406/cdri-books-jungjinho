/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../styles/theme';
import { Typography } from '../common/Typography';
import { Icon } from '../common/Icon';
import type { BookListItemProps } from '../../types/book';
import { showToast } from '../common';

export const BookListItem: React.FC<BookListItemProps> = ({
  book,
  isLiked,
  onToggleLike,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatPrice = (price: number) => {
    return price.toLocaleString() + '원';
  };

  const getDisplayAuthors = (authors: string[]) => {
    return authors.join(', ');
  };

  const handleDetailClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div css={bookListItemContainerStyles(isExpanded)}>
      <div css={bookItemMainStyles(isExpanded)}>
        <div css={bookImageWrapperStyles}>
          {book.thumbnail ? (
            <img
              src={book.thumbnail}
              alt={book.title}
              css={bookImageStyles(isExpanded)}
            />
          ) : (
            <Typography variant="caption" color="subtitle">
              이미지 없음
            </Typography>
          )}
          <button
            css={heartButtonStyles(isExpanded)}
            onClick={() => {
              onToggleLike(book);
              if (isLiked) {
                showToast.success('찜한 책에서 제거했습니다.');
              } else {
                showToast.success('찜한 책에 추가했습니다.');
              }
            }}
            aria-label={isLiked ? '찜하기 해제' : '찜하기'}
          >
            <Icon
              name={isLiked ? 'heart-filled' : 'heart'}
              size={isExpanded ? 24 : 16}
              color={isLiked ? theme.colors.red : theme.colors.white}
            />
          </button>
        </div>

        <div css={bookContentWrapperStyles(isExpanded)}>
          <div css={bookHeaderSectionStyles}>
            <div css={bookInfoSectionStyles}>
              <div css={titleAuthorWrapperStyles}>
                <Typography variant="title3" color="primary">
                  {book.title}
                </Typography>
                <Typography variant="body2" color="secondary">
                  {getDisplayAuthors(book.authors)}
                </Typography>
              </div>
            </div>

            {!isExpanded && (
              <div css={collapsedPriceStyles}>
                <Typography variant="title3" color="primary">
                  {formatPrice(
                    book.sale_price > 0 ? book.sale_price : book.price
                  )}
                </Typography>
              </div>
            )}

            <div css={actionButtonsWrapperStyles}>
              {!isExpanded && (
                <button css={primaryButtonStyles}>구매하기</button>
              )}
              <button css={detailViewButtonStyles} onClick={handleDetailClick}>
                상세보기
                <Icon
                  name="arrow-down"
                  size={24}
                  color={theme.colors.text.subtitle}
                  css={arrowIconAnimationStyles(isExpanded)}
                />
              </button>
            </div>
          </div>

          {isExpanded && (
            <div css={expandedContentWrapperStyles}>
              <div css={bookDescriptionSectionStyles}>
                <div css={descriptionHeaderStyles}>책 소개</div>
                <div css={descriptionBodyStyles}>{book.contents}</div>
              </div>

              <div css={expandedActionsWrapperStyles}>
                <div css={expandedPriceSectionStyles}>
                  <div css={priceLineStyles}>
                    <span css={priceLabelStyles}>원가</span>
                    <span css={originalPriceValueStyles(book.sale_price > 0)}>
                      {formatPrice(book.price)}
                    </span>
                  </div>
                  {book.sale_price > 0 && (
                    <div css={priceLineStyles}>
                      <span css={priceLabelStyles}>할인가</span>
                      <span css={salePriceValueStyles}>
                        {formatPrice(book.sale_price)}
                      </span>
                    </div>
                  )}
                </div>

                <button css={expandedPurchaseButtonStyles}>구매하기</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const bookListItemContainerStyles = (isExpanded: boolean) => css`
  width: 100%;
  background-color: ${theme.colors.white};
  border-bottom: 1px solid ${theme.colors.border};
  position: relative;
  padding: ${isExpanded ? '26px' : '16px'} 16px 26px 48px;
`;

const bookItemMainStyles = (isExpanded: boolean) => css`
  display: flex;
  align-items: ${isExpanded ? 'flex-start' : 'center'};
`;

const expandedPriceSectionStyles = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const priceLineStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
`;

const priceLabelStyles = css`
  width: 37px;
  font-size: 10px;
  font-weight: 500;
  line-height: 2.2;
  color: ${theme.colors.text.secondary};
  text-align: right;
`;

const originalPriceValueStyles = (isSalePrice: boolean) => css`
  font-size: 18px;
  font-weight: 350;
  color: ${theme.colors.text.primary};
  text-decoration: ${isSalePrice ? 'line-through' : 'none'};
  width: 76px;
`;

const salePriceValueStyles = css`
  font-size: 18px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
`;

const bookDescriptionSectionStyles = css`
  width: 360px;
`;

const descriptionHeaderStyles = css`
  font-size: 14px;
  font-weight: 700;
  color: ${theme.colors.text.primary};
  line-height: 1.857;
  margin-bottom: 12px;
`;

const descriptionBodyStyles = css`
  font-size: 10px;
  font-weight: 500;
  line-height: 1.6;
  color: ${theme.colors.text.primary};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 11;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
`;

const expandedActionsWrapperStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 28px;
  margin-top: auto;
`;

const expandedPurchaseButtonStyles = css`
  width: 240px;
  height: 48px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const bookImageWrapperStyles = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.lightGray};
  border-radius: ${theme.borderRadius.sm};
`;

const bookImageStyles = (isExpanded: boolean) => css`
  width: ${isExpanded ? '210px' : '48px'};
  height: ${isExpanded ? '280px' : '68px'};
  object-fit: cover;
`;

const bookContentWrapperStyles = (isExpanded: boolean) => css`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: ${isExpanded ? '280px' : 'auto'};
  margin-left: ${isExpanded ? '32px' : '48px'};
`;

const bookHeaderSectionStyles = css`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const bookInfoSectionStyles = css`
  flex: 1;
`;

const titleAuthorWrapperStyles = css`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 4px;
`;

const collapsedPriceStyles = css`
  text-align: right;
  margin-right: 48px;
`;

const actionButtonsWrapperStyles = css`
  display: flex;
  gap: 8px;
`;

const baseButtonStyles = css`
  height: 48px;
  border-radius: ${theme.borderRadius.md};
  border: none;
  cursor: pointer;
  font-family: ${theme.typography.fontFamily};
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const detailViewButtonStyles = css`
  ${baseButtonStyles}
  display: flex;
  align-items: center;
  justify-content: center;
  width: 115px;
  background-color: ${theme.colors.lightGray};
  color: ${theme.colors.text.secondary};
  * {
    cursor: pointer;
  }
`;

const arrowIconAnimationStyles = (isExpanded: boolean) => css`
  transform: ${isExpanded ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform ${theme.transitions.fast};
`;

const primaryButtonStyles = css`
  ${baseButtonStyles}
  width: 115px;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.white};
`;

const heartButtonStyles = (isExpanded: boolean) => css`
  position: absolute;
  top: ${isExpanded ? '8px' : '0'};
  right: ${isExpanded ? '8px' : '0'};
  border: none;
  transition: none;
  * {
    cursor: pointer;
  }
`;

const expandedContentWrapperStyles = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
  gap: 48px;
`;

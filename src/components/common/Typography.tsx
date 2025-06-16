import styled from '@emotion/styled';
import { theme } from '../../styles/theme';
import type { ReactNode, ElementType, CSSProperties } from 'react';

type TypographyVariant =
  | 'title1'
  | 'title2'
  | 'title3'
  | 'body1'
  | 'body2'
  | 'body2Bold'
  | 'caption'
  | 'small';

type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'subtitle'
  | 'black'
  | 'white'
  | 'error'
  | 'success';

interface TypographyProps {
  variant?: TypographyVariant;
  color?: TypographyColor;
  children: ReactNode;
  className?: string;
  as?: ElementType;
  style?: CSSProperties;
}

interface StyledTextProps {
  $variant: TypographyVariant;
  $color: TypographyColor;
}

const getColorValue = (color: TypographyColor): string => {
  const colorMap = {
    primary: theme.colors.text.primary,
    secondary: theme.colors.text.secondary,
    subtitle: theme.colors.text.subtitle,
    black: theme.colors.black,
    white: theme.colors.white,
    error: theme.colors.error,
    success: theme.colors.success,
  };
  return colorMap[color] || theme.colors.text.primary;
};

const StyledText = styled.span<StyledTextProps>`
  font-family: ${theme.typography.fontFamily};
  font-size: ${({ $variant }) => theme.typography[$variant].fontSize};
  font-weight: ${({ $variant }) => theme.typography[$variant].fontWeight};
  line-height: ${({ $variant }) => theme.typography[$variant].lineHeight};
  color: ${({ $color }) => getColorValue($color)};
  margin: 0;
`;

const getDefaultElement = (variant: TypographyVariant): ElementType => {
  switch (variant) {
    case 'title1':
      return 'h1';
    case 'title2':
      return 'h2';
    case 'title3':
      return 'h3';
    case 'body1':
    case 'body2':
    case 'body2Bold':
      return 'p';
    case 'caption':
    case 'small':
      return 'span';
    default:
      return 'p';
  }
};

export const Typography = ({
  variant = 'body1',
  color = 'primary',
  children,
  className = '',
  as,
  style,
}: TypographyProps) => {
  const Component = as || getDefaultElement(variant);

  return (
    <StyledText
      as={Component}
      $variant={variant}
      $color={color}
      className={className}
      style={style}
    >
      {children}
    </StyledText>
  );
};

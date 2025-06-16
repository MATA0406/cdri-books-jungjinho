export interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  onClick?: () => void;
}

export type IconName =
  | 'search'
  | 'heart'
  | 'heart-filled'
  | 'star'
  | 'star-filled'
  | 'book'
  | 'bookmark'
  | 'bookmark-filled'
  | 'arrow-left'
  | 'arrow-right'
  | 'close'
  | 'menu'
  | 'filter'
  | 'sort';

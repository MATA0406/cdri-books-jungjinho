export interface BookMeta {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
}

export interface Book {
  title: string;
  contents: string;
  url: string;
  isbn: string;
  datetime: string;
  authors: string[];
  publisher: string;
  translators: string[];
  price: number;
  sale_price: number;
  thumbnail: string;
  status: string;
}

export interface BookSearchResponse {
  meta: BookMeta;
  documents: Book[];
}

export interface BookSearchParams {
  query: string;
  sort?: 'accuracy' | 'latest';
  page?: number;
  size?: number;
  target?: 'title' | 'isbn' | 'keyword' | 'publisher';
}

export interface BookListItemProps {
  book: Book;
  isLiked: boolean;
  onToggleLike: (isbn: string) => void;
  onViewDetail: (isbn: string) => void;
}

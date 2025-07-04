import { useInfiniteQuery } from '@tanstack/react-query';
import { searchBooks } from '../api/books';
import type { BookSearchParams, BookSearchResponse } from '../types/book';

interface UseInfiniteBookSearchProps {
  query: string;
  target?: 'title' | 'person' | 'publisher';
  enabled?: boolean;
}

export const useInfiniteBookSearch = ({
  query,
  target,
  enabled = true,
}: UseInfiniteBookSearchProps) => {
  return useInfiniteQuery({
    queryKey: ['books', 'search', query, target],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      const params: BookSearchParams = {
        query: query || ' ',
        page: pageParam,
        size: 10,
        sort: 'accuracy',
        ...(target && { target }),
      };
      return searchBooks(params);
    },
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: BookSearchResponse,
      allPages: BookSearchResponse[]
    ) => {
      if (lastPage.meta.is_end) {
        return undefined;
      }
      return allPages.length + 1;
    },
    enabled: enabled,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
};

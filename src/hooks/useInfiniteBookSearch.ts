import { useInfiniteQuery } from '@tanstack/react-query';
import { searchBooks } from '../api/books';
import type { BookSearchParams, BookSearchResponse } from '../types/book';

interface UseInfiniteBookSearchProps {
  query: string;
  enabled?: boolean;
}

export const useInfiniteBookSearch = ({
  query,
  enabled = true,
}: UseInfiniteBookSearchProps) => {
  return useInfiniteQuery({
    queryKey: ['books', 'search', query],
    queryFn: ({ pageParam }: { pageParam: number }) => {
      const params: BookSearchParams = {
        query: query || ' ',
        page: pageParam,
        size: 10,
        sort: 'accuracy',
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

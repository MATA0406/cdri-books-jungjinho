import { useState, useCallback, useEffect } from 'react';
import type { Book } from '../types/book';

const LIKED_BOOKS_KEY = 'likedBooks';

export const useLikedBooks = () => {
  const [likedBooks, setLikedBooks] = useState<Map<string, Book>>(new Map());

  // 로컬스토리지에서 찜한 책 데이터 불러오기
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LIKED_BOOKS_KEY);
      if (stored) {
        const parsedBooks = JSON.parse(stored) as Array<[string, Book]>;
        setLikedBooks(new Map(parsedBooks));
      }
    } catch (error) {
      console.error('찜한 책 데이터 로드 중 오류:', error);
    }
  }, []);

  // 로컬스토리지에 찜한 책 데이터 저장
  const saveToLocalStorage = useCallback((booksMap: Map<string, Book>) => {
    try {
      const booksArray = Array.from(booksMap.entries());
      localStorage.setItem(LIKED_BOOKS_KEY, JSON.stringify(booksArray));
    } catch (error) {
      console.error('찜한 책 데이터 저장 중 오류:', error);
    }
  }, []);

  const toggleLike = useCallback(
    (book: Book) => {
      setLikedBooks(prev => {
        const newLikedBooks = new Map(prev);
        const isbn = book.isbn;

        if (newLikedBooks.has(isbn)) {
          newLikedBooks.delete(isbn);
        } else {
          newLikedBooks.set(isbn, book);
        }

        saveToLocalStorage(newLikedBooks);
        return newLikedBooks;
      });
    },
    [saveToLocalStorage]
  );

  const isLiked = useCallback(
    (isbn: string) => {
      return likedBooks.has(isbn);
    },
    [likedBooks]
  );

  const getLikedBooks = useCallback(() => {
    return Array.from(likedBooks.values());
  }, [likedBooks]);

  const getLikedBooksCount = useCallback(() => {
    return likedBooks.size;
  }, [likedBooks]);

  return {
    likedBooks,
    toggleLike,
    isLiked,
    getLikedBooks,
    getLikedBooksCount,
  };
};

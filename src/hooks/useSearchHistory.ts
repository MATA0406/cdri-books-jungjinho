import { useState, useEffect } from 'react';

const SEARCH_HISTORY_KEY = 'bookSearchHistory';
const MAX_HISTORY_COUNT = 8;

export const useSearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 로컬스토리지에서 검색 기록 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSearchHistory(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('검색 기록 불러오기 실패:', error);
      setSearchHistory([]);
    }
  }, []);

  // 검색 기록을 로컬스토리지에 저장
  const saveToStorage = (history: string[]) => {
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('검색 기록 저장 실패:', error);
    }
  };

  // 검색어 추가
  const addSearchTerm = (term: string) => {
    const trimmedTerm = term.trim();
    if (!trimmedTerm) return;

    setSearchHistory(prev => {
      // 기존에 있는 검색어면 제거
      const filtered = prev.filter(item => item !== trimmedTerm);

      // 맨 앞에 추가하고 최대 개수 제한
      const newHistory = [trimmedTerm, ...filtered].slice(0, MAX_HISTORY_COUNT);

      saveToStorage(newHistory);
      return newHistory;
    });
  };

  // 검색어 삭제
  const removeSearchTerm = (term: string) => {
    setSearchHistory(prev => {
      const newHistory = prev.filter(item => item !== term);
      saveToStorage(newHistory);
      return newHistory;
    });
  };

  // 모든 검색 기록 삭제
  const clearSearchHistory = () => {
    setSearchHistory([]);
    saveToStorage([]);
  };

  return {
    searchHistory,
    addSearchTerm,
    removeSearchTerm,
    clearSearchHistory,
  };
};

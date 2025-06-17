import axios from 'axios';
import type { BookSearchResponse, BookSearchParams } from '../types/book';

const API_BASE_URL = 'https://dapi.kakao.com/v3/search/book';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_REST_API_KEY}`,
  },
});

export const searchBooks = async (
  params: BookSearchParams
): Promise<BookSearchResponse> => {
  const { data } = await api.get('', { params });
  return data;
};

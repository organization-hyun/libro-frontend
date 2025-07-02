import api from './apiClient';
import { Book, BookDetail } from '../types/book';

export const booksApi = {
  // 책 검색
  searchBooks: async (query: string): Promise<Book[]> => {
    const response = await api.get(`/books/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  // 책 상세 정보 조회
  getBookDetail: async (bookId: number): Promise<BookDetail> => {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  },

  // 인기 책 조회
  getPopularBooks: async (): Promise<Book[]> => {
    const response = await api.get('/books/popular');
    return response.data;
  },

  // 새 책 추가
  addBook: async (bookData: {
    title: string;
    author: string;
    description: string;
  }): Promise<{ id: number }> => {
    const response = await api.post('/books', bookData);
    return response.data;
  },
}; 
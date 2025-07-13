import { useState, useEffect } from 'react';
import api from '@/api/apiClient';
import { booksApi } from '@/api/books';

export interface Book {
  id: number;
  title: string;
  author: string;
}

export const useBooks = (shouldFetch: boolean = false) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/books');
      setBooks(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError('도서 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const addBook = async (bookData: {
    title: string;
    author: string;
    description: string;
  }) => {
    try {
      const { id } = await booksApi.addBook(bookData);
      
      const newBook: Book = {
        id,
        title: bookData.title,
        author: bookData.author
      };
      
      setBooks(prev => [newBook, ...prev]);
      return { success: true, book: newBook };
    } catch (err) {
      console.error('Error adding new book:', err);
      return { success: false, error: '새 책 추가에 실패했습니다.' };
    }
  };

  const filterBooks = (query: string) => {
    return books.filter(book => 
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
  };

  useEffect(() => {
    if (shouldFetch) {
      fetchBooks();
    }
  }, [shouldFetch]);

  return {
    books,
    isLoading,
    error,
    fetchBooks,
    addBook,
    filterBooks
  };
}; 
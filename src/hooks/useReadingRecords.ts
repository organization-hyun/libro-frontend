import { useState, useEffect } from 'react';
import api from '@/api/apiClient';
import { ReadingRecord } from '@/types/readingRecord';

export const useReadingRecords = () => {
  const [readingRecords, setReadingRecords] = useState<ReadingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReadingRecords = async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/reading-records');
      setReadingRecords(response.data);
      setError(null);
    } catch (err) {
      setError('도서 목록을 불러오는데 실패했습니다.');
      console.error('Error fetching reading records:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const addReadingRecord = async (bookId: number, bookTitle: string, bookAuthor: string) => {
    try {
      const response = await api.post('/reading-records', { bookId });
      
      const newReadingRecord: ReadingRecord = {
        id: response.data.id,
        bookTitle,
        bookAuthor
      };
      
      setReadingRecords(prev => [...prev, newReadingRecord]);
      return { success: true, message: `"${bookTitle}"이(가) 추가되었습니다.` };
    } catch (err) {
      console.error('Error adding book:', err);
      return { success: false, message: '도서 추가에 실패했습니다.' };
    }
  };

  const deleteReadingRecord = async (bookId: number, bookTitle: string) => {
    try {
      await api.delete(`/reading-records/${bookId}`);
      setReadingRecords(prev => prev.filter(book => book.id !== bookId));
      return { success: true, message: `"${bookTitle}"이(가) 삭제되었습니다.` };
    } catch (err) {
      console.error('Error deleting book:', err);
      return { success: false, message: '도서 삭제에 실패했습니다.' };
    }
  };

  useEffect(() => {
    fetchReadingRecords();
  }, []);

  return {
    readingRecords,
    isLoading,
    error,
    addReadingRecord,
    deleteReadingRecord,
    refetch: fetchReadingRecords
  };
}; 
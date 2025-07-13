import api from './apiClient';
import { ReadingCompletion, ReadingCompletionResponse } from '../types/readingRecord';

export const readingCompletionApi = {
  // 독서 완료 기록 생성
  createReadingCompletion: async (data: {
    date: string;
    duration: number;
    bookId?: number;
    note?: string;
  }): Promise<ReadingCompletionResponse> => {
    const response = await api.post('/reading-completions', data);
    return response.data;
  },

  // 월별 독서 완료 기록 조회
  getReadingCompletionsByMonth: async (year: number, month: number): Promise<ReadingCompletion[]> => {
    const response = await api.get(`/reading-completions?year=${year}&month=${month}`);
    return response.data;
  },


}; 
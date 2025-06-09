import api from './config';

export interface ReadingGroupItem {
  id: number;
  bookTitle: string;
  bookAuthor: string;
  description: string;
}

export const getReadingGroups = async (): Promise<ReadingGroupItem[]> => {
  const response = await api.get<ReadingGroupItem[]>('/reading-groups');
  return response.data;
}; 
import api from '@/api/apiClient';

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

export const getReadingGroupById = async (id: string): Promise<ReadingGroupItem> => {
  const response = await api.get<ReadingGroupItem>(`/reading-groups/${id}`);
  return response.data;
}; 
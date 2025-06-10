import api from '@/api/apiClient';
import { ReadingRecord } from '../types/readingRecord';

export interface ReadingGroupItem {
  id: number;
  bookTitle: string;
  bookAuthor: string;
  description: string;
}

export interface SharedReadingRecord {
  readingRecordId: number;
  writerName: string;
  review: string;
  sharedDate: string;
}

export const getReadingGroups = async (): Promise<ReadingGroupItem[]> => {
  const response = await api.get<ReadingGroupItem[]>('/reading-groups');
  return response.data;
};

export const getReadingGroupById = async (id: string): Promise<ReadingGroupItem> => {
  const response = await api.get<ReadingGroupItem>(`/reading-groups/${id}`);
  return response.data;
};

export const getSharedReadingRecords = async (groupId: string): Promise<SharedReadingRecord[]> => {
  const response = await api.get<SharedReadingRecord[]>(`/reading-groups/${groupId}/shared-reading-records`);
  return response.data;
};

export const shareReadingRecord = async (groupId: string, recordId: number): Promise<SharedReadingRecord> => {
  try {
    const response = await api.post<SharedReadingRecord>(`/reading-groups/${groupId}/shared-reading-record`, {
      readingRecordId: recordId
    });
    return response.data;
  } catch (error) {
    console.error('Error sharing reading record:', error);
    throw error;
  }
}; 
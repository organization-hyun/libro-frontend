import api from '@/api/apiClient';
import { ReadingRecord } from '../types/readingRecord';

export interface ReadingGroupItem {
  id: number;
  bookTitle: string;
  bookAuthor: string;
  description: string;
}

export interface SharedReadingRecord {
  id: number;
  content: string;
  pageNumber?: number;
  createdAt: string;
  userId: number;
  userName: string;
  bookTitle: string;
  bookAuthor: string;
}

// 임시 더미 데이터
const mockSharedRecords: { [key: string]: SharedReadingRecord[] } = {
  '1': [
    {
      id: 1,
      content: "이 책의 3장에서 저자는 인공지능의 윤리적 문제를 깊이 있게 다룹니다. 특히 자율주행 자동차의 트롤리 딜레마 부분이 인상적이었습니다.",
      pageNumber: 89,
      createdAt: "2024-03-15T09:00:00Z",
      userId: 1,
      userName: "김철수",
      bookTitle: "인공지능과 윤리",
      bookAuthor: "제임스 배럿"
    },
    {
      id: 2,
      content: "5장의 데이터 프라이버시 부분은 현대 사회에서 매우 중요한 주제를 다루고 있습니다. 개인정보 보호와 기술 발전 사이의 균형에 대한 저자의 견해가 흥미로웠습니다.",
      pageNumber: 156,
      createdAt: "2024-03-16T15:30:00Z",
      userId: 2,
      userName: "이영희",
      bookTitle: "인공지능과 윤리",
      bookAuthor: "제임스 배럿"
    }
  ],
  '2': [
    {
      id: 3,
      content: "작가의 섬세한 심리 묘사가 인상적입니다. 특히 주인공이 과거와 대면하는 장면이 마음에 와닿았습니다.",
      pageNumber: 42,
      createdAt: "2024-03-14T10:20:00Z",
      userId: 3,
      userName: "박지민",
      bookTitle: "겨울의 정원",
      bookAuthor: "한강"
    }
  ]
};

// 임시로 사용할 마지막 ID (새로운 레코드 생성 시 증가)
let lastId = 3;

export const getReadingGroups = async (): Promise<ReadingGroupItem[]> => {
  const response = await api.get<ReadingGroupItem[]>('/reading-groups');
  return response.data;
};

export const getReadingGroupById = async (id: string): Promise<ReadingGroupItem> => {
  const response = await api.get<ReadingGroupItem>(`/reading-groups/${id}`);
  return response.data;
};

export const getSharedReadingRecords = async (groupId: string): Promise<SharedReadingRecord[]> => {
  // 실제 API 호출 대신 더미 데이터 반환
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockSharedRecords[groupId] || []);
    }, 500); // 실제 API 호출처럼 보이게 하기 위한 지연
  });
};

export const shareReadingRecord = async (groupId: string, recordId: number): Promise<SharedReadingRecord> => {
  // 실제 API 호출 대신 더미 데이터 생성
  return new Promise(async (resolve) => {
    try {
      // 선택된 독서 기록 데이터 가져오기
      const response = await api.get<ReadingRecord>(`/books/${recordId}`);
      const selectedRecord = response.data;

      setTimeout(() => {
        // 새로운 공유 기록 생성 (선택된 독서 기록 데이터 사용)
        const newSharedRecord: SharedReadingRecord = {
          id: ++lastId,
          content: selectedRecord.review || "내용 없음",
          createdAt: new Date().toISOString(),
          userId: Math.floor(Math.random() * 1000) + 1, // 임시 사용자 ID
          userName: "현재 사용자", // 실제로는 로그인한 사용자 정보를 사용해야 함
          bookTitle: selectedRecord.bookTitle,
          bookAuthor: selectedRecord.bookAuthor
        };

        // 해당 그룹의 공유 기록 배열이 없다면 생성
        if (!mockSharedRecords[groupId]) {
          mockSharedRecords[groupId] = [];
        }

        // 새로운 기록 추가
        mockSharedRecords[groupId].push(newSharedRecord);

        resolve(newSharedRecord);
      }, 500);
    } catch (error) {
      console.error('Error fetching reading record:', error);
      // 에러 발생 시 기본 더미 데이터로 폴백
      resolve({
        id: ++lastId,
        content: "독서 기록을 불러오는데 실패했습니다.",
        createdAt: new Date().toISOString(),
        userId: Math.floor(Math.random() * 1000) + 1,
        userName: "현재 사용자",
        bookTitle: "알 수 없는 책",
        bookAuthor: "알 수 없는 저자"
      });
    }
  });
}; 
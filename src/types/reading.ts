export interface ReadingRecord {
  id: number;
  title: string;
  author: string;
  date: string;
  // 추후 추가될 수 있는 필드들
  rating?: number;
  review?: string;
  coverImage?: string;
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
} 
export interface ReadingRecord {
  id: number;
  bookTitle: string;
  bookAuthor: string;
  // 추후 추가될 수 있는 필드들
  date?: string;
  rating?: number;
  review?: string;
  coverImage?: string;
  isbn?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
} 
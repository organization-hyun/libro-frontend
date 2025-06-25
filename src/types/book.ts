export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

export interface BookDetail extends Book {
  relatedBooks?: Book[];
} 
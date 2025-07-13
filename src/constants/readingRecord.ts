export const TAB_TYPES = {
  BOOKS: 'books',
  CALENDAR: 'calendar'
} as const;

export const TOAST_DURATION = 3000;

export const CONFIRM_MESSAGES = {
  DELETE_BOOK: (title: string) => `"${title}"을(를) 정말로 삭제하시겠습니까?`,
} as const;

export const ERROR_MESSAGES = {
  FETCH_RECORDS: '도서 목록을 불러오는데 실패했습니다.',
  FETCH_BOOKS: '도서 목록을 불러오는데 실패했습니다.',
  ADD_BOOK: '도서 추가에 실패했습니다.',
  DELETE_BOOK: '도서 삭제에 실패했습니다.',
  ADD_NEW_BOOK: '새 책 추가에 실패했습니다.',
} as const;

export const SUCCESS_MESSAGES = {
  BOOK_ADDED: (title: string) => `"${title}"이(가) 추가되었습니다.`,
  BOOK_DELETED: (title: string) => `"${title}"이(가) 삭제되었습니다.`,
  NEW_BOOK_ADDED: (title: string) => `"${title}"이(가) 성공적으로 추가되었습니다!`,
} as const; 
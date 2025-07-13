/**
 * 분 단위 시간을 한국어 형식으로 포맷팅
 * @param minutes 분 단위 시간
 * @returns 포맷팅된 시간 문자열 (예: "2시간 30분", "45분")
 */
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}시간 ${mins}분`;
  }
  return `${mins}분`;
};

/**
 * 날짜를 YYYY-MM-DD 형식으로 포맷팅
 * @param date Date 객체
 * @returns YYYY-MM-DD 형식의 문자열
 */
export const formatDateToYYYYMMDD = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * 날짜 문자열을 한국어 형식으로 포맷팅
 * @param dateString YYYY-MM-DD 형식의 날짜 문자열
 * @returns 한국어 형식의 날짜 문자열 (예: "2024년 1월 15일 월요일")
 */
export const formatDateToKorean = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  };
  return date.toLocaleDateString('ko-KR', options);
}; 
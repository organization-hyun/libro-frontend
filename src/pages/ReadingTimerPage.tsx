import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import ReadingTimer from '../components/reading/ReadingTimer';
import api from '@/api/apiClient';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.main};
  padding: ${theme.spacing.lg};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.lg};
`;

const BookSelectionContainer = styled.div`
  background: ${theme.colors.background.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.sm};
`;

const BookSelectionTitle = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  font-weight: 600;
`;

const BookList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const BookOption = styled.button<{ selected: boolean }>`
  padding: ${theme.spacing.md};
  border: 2px solid ${props => props.selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.selected ? theme.colors.primary : theme.colors.background.white};
  color: ${props => props.selected ? 'white' : theme.colors.text.primary};
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  text-align: left;
  min-width: 200px;

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const BookTitle = styled.div`
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs};
`;

const BookAuthor = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const NoBookOption = styled(BookOption)`
  border-style: dashed;
  color: ${theme.colors.text.secondary};
`;

const ReadingTimerPage: React.FC = () => {
  const [readingRecords, setReadingRecords] = useState<Array<{ id: number; bookTitle: string; bookAuthor: string }>>([]);
  const [selectedBook, setSelectedBook] = useState<{ id: number; title: string; author: string } | null>(null);

  useEffect(() => {
    const fetchReadingRecords = async () => {
      try {
        const response = await api.get('/reading-records');
        setReadingRecords(response.data);
      } catch (error) {
        console.error('독서 기록을 불러오는데 실패했습니다:', error);
      }
    };

    fetchReadingRecords();
  }, []);

  const handleTimerComplete = () => {
    // 타이머 완료 시 추가 작업이 필요한 경우 여기에 구현
    console.log('독서 타이머가 완료되었습니다.');
  };

  const handleBookSelect = (book: { id: number; title: string; author: string } | null) => {
    setSelectedBook(book);
  };

  return (
    <PageContainer>
      <Header>
        <Title>독서 타이머</Title>
        <Subtitle>
          매일 꾸준한 독서 습관을 만들어보세요
        </Subtitle>
      </Header>

      <BookSelectionContainer>
        <BookSelectionTitle>어떤 책을 읽으실 건가요?</BookSelectionTitle>
        <BookList>
          <NoBookOption
            selected={selectedBook === null}
            onClick={() => handleBookSelect(null)}
          >
            <BookTitle>책 없이 독서하기</BookTitle>
            <BookAuthor>일반적인 독서 시간 기록</BookAuthor>
          </NoBookOption>
          
          {readingRecords.map((record) => (
            <BookOption
              key={record.id}
              selected={selectedBook?.id === record.id}
              onClick={() => handleBookSelect({
                id: record.id,
                title: record.bookTitle,
                author: record.bookAuthor
              })}
            >
              <BookTitle>{record.bookTitle}</BookTitle>
              <BookAuthor>{record.bookAuthor}</BookAuthor>
            </BookOption>
          ))}
        </BookList>
      </BookSelectionContainer>

      <ReadingTimer 
        onComplete={handleTimerComplete} 
        selectedBook={selectedBook || undefined}
      />
    </PageContainer>
  );
};

export default ReadingTimerPage; 
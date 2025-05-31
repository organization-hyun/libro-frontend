import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { ReadingRecord as ReadingRecordType } from '../types/reading';
import { Card } from '../components/common/Card';
import { FloatingButton } from '../components/common/FloatingButton';

const ReadingRecordContainer = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const Description = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
`;

const RecordList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
`;

const BookTitle = styled.h3`
  font-size: 1.2rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
`;

const BookAuthor = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  margin-bottom: ${theme.spacing.sm};
`;

const RecordDate = styled.p`
  color: ${theme.colors.text.light};
  font-size: 0.8rem;
`;

const ReadingRecord: React.FC = () => {
  // 임시 데이터
  const records: ReadingRecordType[] = [
    {
      id: 1,
      title: '데미안',
      author: '헤르만 헤세',
      date: '2024-03-15',
    },
    {
      id: 2,
      title: '어떻게 하면 행복할 수 있을까',
      author: '김수영',
      date: '2024-03-10',
    },
  ];

  const handleAddRecord = () => {
    // TODO: 새로운 독서 기록 추가 모달 열기
    console.log('Add new record');
  };

  return (
    <ReadingRecordContainer>
      <Header>
        <Title>독서 기록</Title>
        <Description>나만의 독서 여정을 기록하고 관리해보세요.</Description>
      </Header>

      <RecordList>
        {records.map((record) => (
          <Card key={record.id}>
            <BookTitle>{record.title}</BookTitle>
            <BookAuthor>{record.author}</BookAuthor>
            <RecordDate>읽은 날짜: {record.date}</RecordDate>
          </Card>
        ))}
      </RecordList>

      <FloatingButton onClick={handleAddRecord}>+</FloatingButton>
    </ReadingRecordContainer>
  );
};

export default ReadingRecord; 
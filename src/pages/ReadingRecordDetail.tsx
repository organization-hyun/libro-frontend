import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { ReadingRecord as ReadingRecordType } from '../types/reading';

const DetailContainer = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: 0;
  margin-bottom: ${theme.spacing.md};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const BookInfo = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

const BookTitle = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  font-weight: 700;
  line-height: 1.2;
`;

const BookAuthor = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.secondary};
  font-weight: 500;
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
`;

const Content = styled.div`
  background: ${theme.colors.background.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
`;

const EmptyMessage = styled.p`
  color: ${theme.colors.text.secondary};
  text-align: center;
  padding: ${theme.spacing.xl} 0;
`;

const ReadingRecordDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // TODO: API 연동 후 실제 데이터로 교체
  const record: ReadingRecordType = {
    id: Number(id),
    title: '데미안',
    author: '헤르만 헤세',
    date: '2024-03-15',
  };

  return (
    <DetailContainer>
      <Header>
        <BackButton onClick={() => navigate('/reading-record')}>
          ← 돌아가기
        </BackButton>
        <BookInfo>
          <BookTitle>{record.title}</BookTitle>
          <BookAuthor>{record.author}</BookAuthor>
        </BookInfo>
      </Header>

      <Section>
        <SectionTitle>기록</SectionTitle>
        <Content>
          <EmptyMessage>아직 작성된 기록이 없습니다.</EmptyMessage>
        </Content>
      </Section>
    </DetailContainer>
  );
};

export default ReadingRecordDetail; 
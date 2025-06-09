import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { getReadingGroups, ReadingGroupItem } from '../api/readingGroup';

const Container = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text.primary};
  font-weight: 700;
`;

const BookGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
`;

const BookCard = styled.div`
  background: ${theme.colors.background.white};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 200px;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.md};
  }
`;

const BookTitle = styled.h2`
  font-size: 1.25rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
  font-weight: 600;
`;

const BookAuthor = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.sm};
`;

const BookDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  line-height: 1.5;
  margin-top: ${theme.spacing.md};
`;

const ReadingGroup: React.FC = () => {
  const navigate = useNavigate();
  const [readingGroups, setReadingGroups] = useState<ReadingGroupItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadingGroups = async () => {
      try {
        const data = await getReadingGroups();
        setReadingGroups(data);
      } catch (err) {
        setError('독서 모임 목록을 불러오는데 실패했습니다.');
        console.error('Failed to fetch reading groups:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadingGroups();
  }, []);

  const handleBookClick = (id: number) => {
    navigate(`/reading-group/${id}`);
  };

  if (isLoading) {
    return (
      <Container>
        <Header>
          <Title>독서 모임</Title>
        </Header>
        <div>로딩 중...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <Title>독서 모임</Title>
        </Header>
        <div style={{ color: theme.colors.error }}>{error}</div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>독서 모임</Title>
      </Header>
      <BookGrid>
        {readingGroups.map((group) => (
          <BookCard key={group.id} onClick={() => handleBookClick(group.id)}>
            <BookTitle>{group.bookTitle}</BookTitle>
            <BookAuthor>{group.bookAuthor}</BookAuthor>
            <BookDescription>
              {group.description}
            </BookDescription>
          </BookCard>
        ))}
      </BookGrid>
    </Container>
  );
};

export default ReadingGroup; 
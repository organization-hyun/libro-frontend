import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';

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

  const handleBookClick = () => {
    navigate('/reading-group/kafka');
  };

  return (
    <Container>
      <Header>
        <Title>독서 모임</Title>
      </Header>
      <BookGrid>
        <BookCard onClick={handleBookClick}>
          <BookTitle>해변의 카프카</BookTitle>
          <BookAuthor>무라카미 하루키</BookAuthor>
          <BookDescription>
            15세 소년 '카프카 타무라'가 어머니와 누나를 찾아 집을 떠나면서 시작되는 
            미스터리한 이야기...
          </BookDescription>
        </BookCard>
      </BookGrid>
    </Container>
  );
};

export default ReadingGroup; 
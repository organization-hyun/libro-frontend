import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { ReadingGroupItem, getReadingGroupById } from '../api/readingGroup';

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
  margin-bottom: ${theme.spacing.lg};
`;

const BookDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  white-space: pre-line;
`;

const LoadingText = styled.p`
  text-align: center;
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
  padding: ${theme.spacing.xl} 0;
`;

const ErrorText = styled.p`
  text-align: center;
  color: ${theme.colors.error};
  font-size: 1.1rem;
  padding: ${theme.spacing.xl} 0;
`;

const ReadingGroupDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [readingGroup, setReadingGroup] = useState<ReadingGroupItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadingGroup = async () => {
      if (!id) {
        setError('Reading group ID is missing');
        setIsLoading(false);
        return;
      }

      try {
        const data = await getReadingGroupById(id);
        setReadingGroup(data);
        setError(null);
      } catch (err) {
        setError('Failed to load reading group details');
        console.error('Error fetching reading group:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadingGroup();
  }, [id]);

  if (isLoading) {
    return (
      <DetailContainer>
        <LoadingText>Loading reading group details...</LoadingText>
      </DetailContainer>
    );
  }

  if (error || !readingGroup) {
    return (
      <DetailContainer>
        <BackButton onClick={() => navigate('/reading-group')}>
          ← 돌아가기
        </BackButton>
        <ErrorText>{error || 'Reading group not found'}</ErrorText>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      <Header>
        <BackButton onClick={() => navigate('/reading-group')}>
          ← 돌아가기
        </BackButton>
        <BookInfo>
          <BookTitle>{readingGroup.bookTitle}</BookTitle>
          <BookAuthor>{readingGroup.bookAuthor}</BookAuthor>
          <BookDescription>{readingGroup.description}</BookDescription>
        </BookInfo>
      </Header>
    </DetailContainer>
  );
};

export default ReadingGroupDetail; 
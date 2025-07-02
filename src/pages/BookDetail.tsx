import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { BookDetail } from '../types/book';
import { booksApi } from '../api/books';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Container = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 1200px;
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

const BookHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
  align-items: center;
  text-align: center;
  animation: fadeInUp 0.6s ease-out;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  ${theme.mediaQueries.mobile} {
    gap: ${theme.spacing.md};
  }
`;

const BookInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  align-items: center;
`;

const BookTitle = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  font-weight: 700;
  line-height: 1.2;
  margin: 0;

  ${theme.mediaQueries.mobile} {
    font-size: 2rem;
  }
`;

const BookAuthor = styled.p`
  font-size: 1.3rem;
  color: ${theme.colors.text.secondary};
  font-weight: 500;
  margin: 0;
`;

const BookMeta = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.sm};
  justify-content: center;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing.lg};
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};
  min-width: 140px;

  ${({ variant = 'secondary' }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: white;
          &:hover {
            background: ${theme.colors.primaryDark};
            transform: translateY(-2px);
          }
        `;
      default:
        return `
          background: ${theme.colors.background.light};
          color: ${theme.colors.text.secondary};
          &:hover {
            background: ${theme.colors.background.white};
            color: ${theme.colors.text.primary};
            transform: translateY(-2px);
          }
        `;
    }
  }}
`;

const ContentSection = styled.section`
  margin-bottom: ${theme.spacing.xl};
  animation: fadeInUp 0.6s ease-out;
  animation-delay: 0.2s;
  animation-fill-mode: both;

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  font-weight: 600;
  margin-bottom: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 2px solid ${theme.colors.border};
`;

const Description = styled.div`
  background: ${theme.colors.background.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  line-height: 1.7;
  color: ${theme.colors.text.secondary};
  font-size: 1rem;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${theme.shadows.md};
  }
`;

const RelatedBooks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.md};
`;

const RelatedBookCard = styled.div`
  background: ${theme.colors.background.white};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.md};
    border-color: ${theme.colors.primary};
  }
`;

const RelatedBookTitle = styled.h3`
  font-size: 1rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
  font-weight: 600;
`;

const RelatedBookAuthor = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin: 0;
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} 0;
  color: ${theme.colors.error};
`;

const BookDetailPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      if (!bookId) {
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);
        const bookData = await booksApi.getBookDetail(parseInt(bookId));
        setBook(bookData);
        setError(null);
      } catch (err) {
        setError('책 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching book detail:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetail();
  }, [bookId, navigate]);

  const handleStartReading = () => {
    if (book) {
      navigate(`/reading-record/${book.id}`);
    }
  };

  const handleRelatedBookClick = (relatedBookId: number) => {
    navigate(`/book/${relatedBookId}`);
  };

  if (isLoading) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>← 돌아가기</BackButton>
        </Header>
        <LoadingSpinner text="책 정보를 불러오는 중입니다..." />
      </Container>
    );
  }

  if (error || !book) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)}>← 돌아가기</BackButton>
        </Header>
        <ErrorContainer>{error || '책을 찾을 수 없습니다.'}</ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>← 돌아가기</BackButton>
      </Header>

      <BookHeader>
        <BookInfo>
          <BookTitle>{book.title}</BookTitle>
          <BookAuthor>{book.author}</BookAuthor>

          <BookMeta>
            {/* 카테고리 정보 제거 */}
          </BookMeta>

          <ActionButtons>
            <Button variant="primary" onClick={handleStartReading}>
              📖 독서 시작하기
            </Button>
          </ActionButtons>
        </BookInfo>
      </BookHeader>

      <ContentSection>
        <SectionTitle>책 소개</SectionTitle>
        <Description>
          {book.description}
        </Description>
      </ContentSection>

      {book.relatedBooks && book.relatedBooks.length > 0 && (
        <ContentSection>
          <SectionTitle>관련 도서</SectionTitle>
          <RelatedBooks>
            {book.relatedBooks.map((relatedBook) => (
              <RelatedBookCard
                key={relatedBook.id}
                onClick={() => handleRelatedBookClick(relatedBook.id)}
              >
                <RelatedBookTitle>{relatedBook.title}</RelatedBookTitle>
                <RelatedBookAuthor>{relatedBook.author}</RelatedBookAuthor>
              </RelatedBookCard>
            ))}
          </RelatedBooks>
        </ContentSection>
      )}
    </Container>
  );
};

export default BookDetailPage; 
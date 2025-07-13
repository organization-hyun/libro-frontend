import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { BookDetail } from '../types/book';
import { booksApi } from '../api/books';
import { LoadingSpinner, BackButton, Button } from '../components/common';
import {userBookApi} from "@api/userBookApi";

const Container = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing.xl};
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

const InteractionBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.spacing.xl};
  border-top: 1px solid ${theme.colors.border};
  border-bottom: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.md} 0;
`;

const InteractionButton = styled.button`
  flex: 1;
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xs};
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  cursor: pointer;
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

  const [isWish, setIsWish] = useState(false);

  const toggleWish = async () => {
    if (!bookId) return;

    const newWish = !isWish;
    setIsWish(newWish); // optimistic update

    try {
      await userBookApi.setWish(Number(bookId), newWish);
    } catch (err) {
      console.error('Failed to update wish state:', err);
      setIsWish(!newWish); // rollback on error
    }
  };

const [isWatching, setIsWatching] = useState(false);

  const toggleWatching = () => {
    setIsWatching(prev => !prev);
  };

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
          <BackButton onClick={() => navigate(-1)} />
        </Header>
        <LoadingSpinner text="책 정보를 불러오는 중입니다..." />
      </Container>
    );
  }

  if (error || !book) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate(-1)} />
        </Header>
        <ErrorContainer>{error || '책을 찾을 수 없습니다.'}</ErrorContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)} />
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

      <InteractionBar>
        <InteractionButton onClick={toggleWish}>
          <img
              src={isWish ? '/images/icons/icon_wish_on.png' : '/images/icons/icon_wish_off.png'}
              alt="보고싶어요 아이콘"
              width={24}
              height={24}
          />
          보고싶어요
        </InteractionButton>
        <InteractionButton>
          <img
              src='/images/icons/icon_comment_off.png'
              alt="코멘트 아이콘"
              width={24}
              height={24}
          />
          코멘트
        </InteractionButton>
        <InteractionButton onClick={toggleWatching}>
          <img
              src={isWatching ? '/images/icons/icon_watching_on.png' : '/images/icons/icon_watching_off.png'}
              alt="보는중 아이콘"
              width={24}
              height={24}
          />
          보는중
        </InteractionButton>
        <InteractionButton>
          <img src="/images/icons/icon_more.png" alt="더보기 아이콘" width={24} height={24} />
          더보기
        </InteractionButton>
      </InteractionBar>

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
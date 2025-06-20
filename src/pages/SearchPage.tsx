import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import api from '@/api/apiClient';

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

const SearchResultTitle = styled.h1`
  font-size: 2rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  font-weight: 700;
`;

const SearchQuery = styled.span`
  color: ${theme.colors.primary};
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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} 0;
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} 0;
  color: ${theme.colors.text.secondary};
`;

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchBooks = async () => {
      if (!query) {
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);
        const response = await api.get(`/books/search?q=${encodeURIComponent(query)}`);
        setBooks(response.data);
        setError(null);
      } catch (err) {
        setError('도서 검색에 실패했습니다.');
        console.error('Error searching books:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [query, navigate]);

  const handleBookClick = (bookId: number) => {
    navigate(`/reading-record/${bookId}`);
  };

  if (isLoading) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate('/')}>← 돌아가기</BackButton>
          <SearchResultTitle>
            <SearchQuery>"{query}"</SearchQuery> 검색 중...
          </SearchResultTitle>
        </Header>
        <LoadingContainer>검색 결과를 불러오는 중입니다...</LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <BackButton onClick={() => navigate('/')}>← 돌아가기</BackButton>
          <SearchResultTitle>
            <SearchQuery>"{query}"</SearchQuery> 검색 결과
          </SearchResultTitle>
        </Header>
        <div style={{ color: theme.colors.error }}>{error}</div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/')}>← 돌아가기</BackButton>
        <SearchResultTitle>
          <SearchQuery>"{query}"</SearchQuery> 검색 결과
        </SearchResultTitle>
      </Header>

      {books.length > 0 ? (
        <BookGrid>
          {books.map((book) => (
            <BookCard key={book.id} onClick={() => handleBookClick(book.id)}>
              <BookTitle>{book.title}</BookTitle>
              <BookAuthor>{book.author}</BookAuthor>
              <BookDescription>{book.description}</BookDescription>
            </BookCard>
          ))}
        </BookGrid>
      ) : (
        <NoResults>
          검색 결과가 없습니다. 다른 검색어를 입력해보세요.
        </NoResults>
      )}
    </Container>
  );
};

export default SearchPage; 
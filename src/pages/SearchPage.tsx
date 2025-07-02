import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { booksApi } from '../api/books';
import { Book } from '../types/book';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AddBookForm from '../components/common/AddBookForm';
import Toast from '../components/common/Toast';

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

const HeaderActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const AddBookButtonSmall = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${theme.colors.primaryDark};
  }
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
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 123, 255, 0.1), transparent);
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primary};
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-4px);
  }
`;

const BookTitle = styled.h2`
  font-size: 1.25rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
  font-weight: 600;
  transition: color 0.2s ease;

  ${BookCard}:hover & {
    color: ${theme.colors.primary};
  }
`;

const BookAuthor = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 500;
`;

const BookDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  line-height: 1.6;
  margin-top: ${theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  transition: color 0.2s ease;

  ${BookCard}:hover & {
    color: ${theme.colors.text.primary};
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} 0;
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
`;



const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isAddingBook, setIsAddingBook] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });
  const query = searchParams.get('q') || '';

  useEffect(() => {
    const fetchBooks = async () => {
      if (!query) {
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);
        const booksData = await booksApi.searchBooks(query);
        setBooks(booksData);
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
    navigate(`/book/${bookId}`);
  };

  const handleAddBook = async (bookData: {
    title: string;
    author: string;
    description: string;
  }) => {
    try {
      setIsAddingBook(true);
      const { id } = await booksApi.addBook(bookData);
      
      // 새로 추가된 책을 목록에 추가 (ID와 함께 전달받은 데이터로 구성)
      const newBook: Book = {
        id,
        title: bookData.title,
        author: bookData.author,
        description: bookData.description,
      };
      setBooks((prev: Book[]) => [newBook, ...prev]);
      
      // 모달 닫기
      setIsAddBookModalOpen(false);
      
      // 성공 메시지
      setToast({
        message: '책이 성공적으로 추가되었습니다!',
        type: 'success',
        isVisible: true,
      });
    } catch (err) {
      console.error('Error adding book:', err);
      setToast({
        message: '책 추가에 실패했습니다. 다시 시도해주세요.',
        type: 'error',
        isVisible: true,
      });
    } finally {
      setIsAddingBook(false);
    }
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
        <LoadingSpinner text="검색 결과를 불러오는 중입니다..." />
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
        <HeaderActions>
          <SearchResultTitle>
            <SearchQuery>"{query}"</SearchQuery> 검색 결과
          </SearchResultTitle>
          <AddBookButtonSmall onClick={() => setIsAddBookModalOpen(true)}>
            + 새 책 추가
          </AddBookButtonSmall>
        </HeaderActions>
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
          <div>검색 결과가 없습니다.</div>
          <div style={{ marginTop: theme.spacing.sm }}>
            원하는 책을 직접 추가해보세요!
          </div>
        </NoResults>
      )}

      <AddBookForm
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
        onSubmit={handleAddBook}
        isLoading={isAddingBook}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </Container>
  );
};

export default SearchPage; 
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Modal } from '../components/common/Modal';
import ReadingCalendar from '../components/reading/ReadingCalendar';
import api from '@/api/apiClient';

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

const DeleteButton = styled.button`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  background: #8c8c8c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${BookCard}:hover & {
    opacity: 1;
    transform: scale(1.1);
  }

  &:hover {
    background: #666666;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const AddBookCard = styled(BookCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.background.light};
  border: 2px dashed ${theme.colors.border};
  cursor: pointer;
  gap: ${theme.spacing.md};

  &:hover {
    background: ${theme.colors.background.main};
    border-color: ${theme.colors.primary};
  }
`;

const PlusIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${theme.colors.primary};
  color: white;
  font-size: 1.5rem;
  font-weight: 300;
`;

const AddBookText = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  line-height: 1.4;
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

const Toast = styled.div<{ show: boolean }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(${props => props.show ? '0' : '100px'});
  background: ${theme.colors.background.white};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.md};
  color: ${theme.colors.text.primary};
  transition: transform 0.3s ease;
  z-index: 1000;
`;

import { ReadingRecord } from '@/types/readingRecord';

const ModalContent = styled.div`
  width: 100%;
  max-width: 600px;
  height: 500px;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.background.white};
  border-radius: ${theme.borderRadius.md};
`;

const SearchContainer = styled.div`
  padding: ${theme.spacing.md};
  position: sticky;
  top: 0;
  background: ${theme.colors.background.white};
  border-bottom: 1px solid ${theme.colors.border};
  z-index: 1;
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  transition: all 0.2s ease;

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }

  &:hover {
    border-color: ${theme.colors.text.secondary};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}20;
  }
`;

const SearchResultCount = styled.div`
  margin-top: ${theme.spacing.sm};
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
`;

const BookList = styled.div`
  flex: 1;
  overflow-y: auto;
  background: ${theme.colors.background.white};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.background.light};
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.border};
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.text.secondary};
  }
`;

const BookItem = styled.div`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-bottom: 1px solid ${theme.colors.border};
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};

  &:hover {
    background-color: ${theme.colors.background.light};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const BookInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const BookItemTitle = styled.div`
  font-weight: 600;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookItemAuthor = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NoResults = styled.div`
  padding: ${theme.spacing.md};
  text-align: center;
  color: ${theme.colors.text.secondary};
`;

const LoadingContainer = styled.div`
  padding: ${theme.spacing.md};
  text-align: center;
  color: ${theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
`;

const TabContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  background: ${props => props.active ? theme.colors.primary : theme.colors.background.light};
  color: ${props => props.active ? 'white' : theme.colors.text.primary};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  margin-right: ${theme.spacing.sm};

  &:hover {
    background: ${props => props.active ? theme.colors.primaryDark : theme.colors.background.main};
  }
`;

const ReadingRecordPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'books' | 'calendar'>('books');
  const navigate = useNavigate();
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [readingRecords, setReadingRecords] = useState<ReadingRecord[]>([]);
  const [books, setBooks] = useState<Array<{ id: number; title: string; author: string }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBooksLoading, setIsBooksLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchReadingRecords = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/reading-records');
        setReadingRecords(response.data);
        setError(null);
      } catch (err) {
        setError('도서 목록을 불러오는데 실패했습니다.');
        console.error('Error fetching reading records:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadingRecords();
  }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!isAddBookModalOpen) return;
      
      try {
        setIsBooksLoading(true);
        const response = await api.get('/books');
        setBooks(response.data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('도서 목록을 불러오는데 실패했습니다.');
      } finally {
        setIsBooksLoading(false);
      }
    };

    fetchBooks();
  }, [isAddBookModalOpen]);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddReadingRecord = async (bookId: number) => {
    const selectedBook = books.find(book => book.id === bookId);
    if (!selectedBook) return;

    try {
      const response = await api.post('/reading-records', {
        bookId: bookId
      });
      
      const newReadingRecord: ReadingRecord = {
        id: response.data.id,
        bookTitle: selectedBook.title,
        bookAuthor: selectedBook.author
      };
      
      setReadingRecords([...readingRecords, newReadingRecord]);
      setIsAddBookModalOpen(false);
      setToastMessage(`"${selectedBook.title}"이(가) 추가되었습니다.`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Error adding book:', err);
      setError('도서 추가에 실패했습니다.');
    }
  };

  const handleBookClick = (bookId: number) => {
    navigate(`/reading-record/${bookId}`);
  };

  const handleDeleteBook = async (bookId: number, bookTitle: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!window.confirm(`"${bookTitle}"을(를) 정말로 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await api.delete(`/reading-records/${bookId}`);
      setReadingRecords(readingRecords.filter(book => book.id !== bookId));
      setToastMessage(`"${bookTitle}"이(가) 삭제되었습니다.`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Error deleting book:', err);
      setError('도서 삭제에 실패했습니다.');
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Header>
          <Title>독서 기록</Title>
        </Header>
        <div>로딩 중...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Header>
          <Title>독서 기록</Title>
        </Header>
        <div style={{ color: 'red' }}>{error}</div>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <Title>독서 기록</Title>
      </Header>

      <TabContainer>
        <TabButton 
          active={activeTab === 'books'} 
          onClick={() => setActiveTab('books')}
        >
          내 책장
        </TabButton>
        <TabButton 
          active={activeTab === 'calendar'} 
          onClick={() => setActiveTab('calendar')}
        >
          독서 캘린더
        </TabButton>
      </TabContainer>

      {activeTab === 'books' && (
        <BookGrid>
          {readingRecords.map((readingRecord) => (
            <BookCard key={readingRecord.id} onClick={() => handleBookClick(readingRecord.id)}>
              <DeleteButton onClick={(e) => handleDeleteBook(readingRecord.id, readingRecord.bookTitle, e)}>×</DeleteButton>
              <BookTitle>{readingRecord.bookTitle}</BookTitle>
              <BookAuthor>{readingRecord.bookAuthor}</BookAuthor>
            </BookCard>
          ))}
          <AddBookCard onClick={() => setIsAddBookModalOpen(true)}>
            <PlusIcon>+</PlusIcon>
            <AddBookText>새로운 책 추가</AddBookText>
          </AddBookCard>
        </BookGrid>
      )}

      {activeTab === 'calendar' && (
        <ReadingCalendar />
      )}

      <Modal
        isOpen={isAddBookModalOpen}
        onClose={() => {
          setIsAddBookModalOpen(false);
          setSearchQuery('');
        }}
        title="새 책 추가"
      >
        <ModalContent>
          <SearchContainer>
            <SearchWrapper>
              <SearchInput
                type="text"
                placeholder="도서 제목 또는 저자로 검색"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </SearchWrapper>
            {!isBooksLoading && searchQuery && (
              <SearchResultCount>
                검색 결과 {filteredBooks.length}건
              </SearchResultCount>
            )}
          </SearchContainer>
          <BookList>
            {isBooksLoading ? (
              <LoadingContainer>
                <span>로딩 중...</span>
              </LoadingContainer>
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookItem key={book.id} onClick={() => handleAddReadingRecord(book.id)}>
                  <BookInfo>
                    <BookItemTitle>{book.title}</BookItemTitle>
                    <BookItemAuthor>{book.author}</BookItemAuthor>
                  </BookInfo>
                </BookItem>
              ))
            ) : (
              <NoResults>
                {searchQuery ? '검색 결과가 없습니다.' : '도서 목록이 없습니다.'}
              </NoResults>
            )}
          </BookList>
        </ModalContent>
      </Modal>

      <Toast show={showToast}>
        {toastMessage}
      </Toast>
    </Container>
  );
};

export default ReadingRecordPage; 
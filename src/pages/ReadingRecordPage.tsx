import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import ReadingCalendar from '../components/reading/ReadingCalendar';
import AddBookForm from '../components/common/AddBookForm';
import BookSearchModal from '../components/reading/BookSearchModal';
import BookCard from '../components/reading/BookCard';
import { useReadingRecords } from '../hooks/useReadingRecords';
import { useBooks } from '../hooks/useBooks';
import { useToast } from '../hooks/useToast';
import { TAB_TYPES, CONFIRM_MESSAGES, SUCCESS_MESSAGES } from '../constants/readingRecord';

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

const AddBookCard = styled.div`
  background: ${theme.colors.background.light};
  border: 2px dashed ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.md};

  &:hover {
    background: ${theme.colors.background.main};
    border-color: ${theme.colors.primary};
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.md};
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

const Toast = styled.div<{ show: boolean; type: string }>`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(${props => props.show ? '0' : '100px'});
  background: ${props => {
    switch (props.type) {
      case 'success':
        return '#4caf50';
      case 'error':
        return '#f44336';
      default:
        return theme.colors.background.white;
    }
  }};
  color: ${props => props.type === 'info' ? theme.colors.text.primary : 'white'};
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.md};
  transition: transform 0.3s ease;
  z-index: 1000;
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

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: ${theme.colors.text.secondary};
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: ${theme.colors.error};
  font-weight: 500;
`;

const ReadingRecordPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<typeof TAB_TYPES[keyof typeof TAB_TYPES]>(TAB_TYPES.BOOKS);
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [isAddNewBookModalOpen, setIsAddNewBookModalOpen] = useState(false);

  // 커스텀 훅 사용
  const {
    readingRecords,
    isLoading: isRecordsLoading,
    error: recordsError,
    addReadingRecord,
    deleteReadingRecord
  } = useReadingRecords();

  const {
    books,
    isLoading: isBooksLoading,
    fetchBooks,
    addBook
  } = useBooks();

  const {
    showToast,
    toastMessage,
    toastType,
    showToastMessage
  } = useToast();

  // 책 선택 핸들러
  const handleBookSelect = useCallback(async (bookId: number) => {
    const selectedBook = books.find(book => book.id === bookId);
    if (!selectedBook) return;

    const result = await addReadingRecord(bookId, selectedBook.title, selectedBook.author);
    
    if (result.success) {
      setIsAddBookModalOpen(false);
      showToastMessage({ 
        message: result.message, 
        type: 'success' 
      });
    } else {
      showToastMessage({ 
        message: result.message, 
        type: 'error' 
      });
    }
  }, [books, addReadingRecord, showToastMessage]);

  // 책 삭제 핸들러
  const handleDeleteBook = useCallback(async (bookId: number, bookTitle: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (!window.confirm(CONFIRM_MESSAGES.DELETE_BOOK(bookTitle))) {
      return;
    }

    const result = await deleteReadingRecord(bookId, bookTitle);
    showToastMessage({ 
      message: result.message, 
      type: result.success ? 'success' : 'error' 
    });
  }, [deleteReadingRecord, showToastMessage]);

  // 새 책 추가 핸들러
  const handleAddNewBook = useCallback(async (bookData: {
    title: string;
    author: string;
    description: string;
  }) => {
    const result = await addBook(bookData);
    
    if (result.success && result.book) {
      // 새 책을 독서 기록에 바로 추가
      const recordResult = await addReadingRecord(result.book.id, result.book.title, result.book.author);
      
      setIsAddNewBookModalOpen(false);
      
      if (recordResult.success) {
        showToastMessage({ 
          message: SUCCESS_MESSAGES.NEW_BOOK_ADDED(bookData.title), 
          type: 'success' 
        });
      } else {
        showToastMessage({ 
          message: recordResult.message, 
          type: 'error' 
        });
      }
    } else {
      showToastMessage({ 
        message: result.error || '새 책 추가에 실패했습니다.', 
        type: 'error' 
      });
    }
  }, [addBook, addReadingRecord, showToastMessage]);

  // 모달 열기 핸들러
  const handleOpenAddBookModal = useCallback(() => {
    setIsAddBookModalOpen(true);
    fetchBooks();
  }, [fetchBooks]);

  // 로딩 상태
  if (isRecordsLoading) {
    return (
      <Container>
        <Header>
          <Title>독서 기록</Title>
        </Header>
        <LoadingContainer>로딩 중...</LoadingContainer>
      </Container>
    );
  }

  // 에러 상태
  if (recordsError) {
    return (
      <Container>
        <Header>
          <Title>독서 기록</Title>
        </Header>
        <ErrorContainer>{recordsError}</ErrorContainer>
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
          active={activeTab === TAB_TYPES.BOOKS} 
          onClick={() => setActiveTab(TAB_TYPES.BOOKS)}
        >
          내 책장
        </TabButton>
        <TabButton 
          active={activeTab === TAB_TYPES.CALENDAR} 
          onClick={() => setActiveTab(TAB_TYPES.CALENDAR)}
        >
          독서 캘린더
        </TabButton>
      </TabContainer>

      {activeTab === TAB_TYPES.BOOKS && (
        <BookGrid>
          {readingRecords.map((readingRecord) => (
            <BookCard 
              key={readingRecord.id}
              id={readingRecord.id}
              title={readingRecord.bookTitle}
              author={readingRecord.bookAuthor}
              onClick={() => navigate(`/reading-record/${readingRecord.id}`)}
              onDelete={(e) => handleDeleteBook(readingRecord.id, readingRecord.bookTitle, e)}
              showDeleteButton={true}
            />
          ))}
          <AddBookCard onClick={handleOpenAddBookModal}>
            <PlusIcon>+</PlusIcon>
            <AddBookText>새로운 책 추가</AddBookText>
          </AddBookCard>
        </BookGrid>
      )}

      {activeTab === TAB_TYPES.CALENDAR && (
        <ReadingCalendar />
      )}

      <BookSearchModal
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
        onBookSelect={handleBookSelect}
        onAddNewBook={() => setIsAddNewBookModalOpen(true)}
        books={books}
        isLoading={isBooksLoading}
      />

      <AddBookForm
        isOpen={isAddNewBookModalOpen}
        onClose={() => setIsAddNewBookModalOpen(false)}
        onSubmit={handleAddNewBook}
        isLoading={false}
      />

      <Toast show={showToast} type={toastType}>
        {toastMessage}
      </Toast>
    </Container>
  );
};

export default ReadingRecordPage; 
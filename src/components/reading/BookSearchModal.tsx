import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Modal } from '../common/Modal';
import { Book } from '../../hooks/useBooks';

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

const AddBookButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  margin-top: ${theme.spacing.sm};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

interface BookSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookSelect: (bookId: number) => void;
  onAddNewBook: () => void;
  books: Book[];
  isLoading: boolean;
}

const BookSearchModal: React.FC<BookSearchModalProps> = ({
  isOpen,
  onClose,
  onBookSelect,
  onAddNewBook,
  books,
  isLoading
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClose = () => {
    setSearchQuery('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
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
          {!isLoading && searchQuery && (
            <SearchResultCount>
              검색 결과 {filteredBooks.length}건
            </SearchResultCount>
          )}
        </SearchContainer>
        <BookList>
          {isLoading ? (
            <LoadingContainer>
              <span>로딩 중...</span>
            </LoadingContainer>
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BookItem key={book.id} onClick={() => onBookSelect(book.id)}>
                <BookInfo>
                  <BookItemTitle>{book.title}</BookItemTitle>
                  <BookItemAuthor>{book.author}</BookItemAuthor>
                </BookInfo>
              </BookItem>
            ))
          ) : (
            <NoResults>
              {searchQuery ? (
                <div>
                  <div style={{ fontSize: '1.1rem', marginBottom: theme.spacing.sm }}>
                    <strong>"{searchQuery}"</strong>에 대한 검색 결과가 없습니다.
                  </div>
                  <div style={{ fontSize: '0.9rem', color: theme.colors.text.light, marginBottom: theme.spacing.md }}>
                    원하는 책을 직접 추가해보세요!
                  </div>
                  <AddBookButton onClick={onAddNewBook}>
                    📚 새 책 등록하기
                  </AddBookButton>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '1.1rem', marginBottom: theme.spacing.sm }}>
                    등록된 도서가 없습니다.
                  </div>
                  <div style={{ fontSize: '0.9rem', color: theme.colors.text.light, marginBottom: theme.spacing.md }}>
                    첫 번째 책을 추가해보세요!
                  </div>
                  <AddBookButton onClick={onAddNewBook}>
                    📚 새 책 등록하기
                  </AddBookButton>
                </div>
              )}
            </NoResults>
          )}
        </BookList>
      </ModalContent>
    </Modal>
  );
};

export default BookSearchModal; 
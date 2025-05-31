import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Modal } from '../components/common/Modal';
import { AddBookForm } from '../components/reading/AddBookForm';

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

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.md};
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

const BookDate = styled.p`
  font-size: 0.875rem;
  color: ${theme.colors.text.light};
`;

interface Book {
  id: number;
  title: string;
  author: string;
  date: string;
}

const ReadingRecord: React.FC = () => {
  const navigate = useNavigate();
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [books, setBooks] = useState<Book[]>([
    {
      id: 1,
      title: '데미안',
      author: '헤르만 헤세',
      date: '2024-03-15',
    },
  ]);

  const handleAddBook = (bookData: { title: string; author: string }) => {
    const newBook: Book = {
      id: Date.now(),
      ...bookData,
      date: new Date().toISOString().split('T')[0],
    };
    setBooks([...books, newBook]);
    setIsAddBookModalOpen(false);
  };

  const handleBookClick = (bookId: number) => {
    navigate(`/reading-record/${bookId}`);
  };

  return (
    <Container>
      <Header>
        <Title>독서 기록</Title>
      </Header>

      <BookGrid>
        {books.map((book) => (
          <BookCard key={book.id} onClick={() => handleBookClick(book.id)}>
            <BookTitle>{book.title}</BookTitle>
            <BookAuthor>{book.author}</BookAuthor>
            <BookDate>{book.date}</BookDate>
          </BookCard>
        ))}
        <AddBookCard onClick={() => setIsAddBookModalOpen(true)}>
          <PlusIcon>+</PlusIcon>
          <AddBookText>새로운 책 추가</AddBookText>
        </AddBookCard>
      </BookGrid>

      <Modal
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
        title="새 책 추가"
      >
        <AddBookForm
          onSubmit={handleAddBook}
          onCancel={() => setIsAddBookModalOpen(false)}
        />
      </Modal>
    </Container>
  );
};

export default ReadingRecord; 
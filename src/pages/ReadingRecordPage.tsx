import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { Modal } from '../components/common/Modal';
import { AddReadingRecordForm } from '../components/reading/AddReadingRecordForm';
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

const ReadingRecordPage: React.FC = () => {
  const navigate = useNavigate();
  const [isAddBookModalOpen, setIsAddBookModalOpen] = useState(false);
  const [readingRecords, setReadingRecords] = useState<ReadingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    const fetchReadingRecords = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/reading-records');
        setReadingRecords(response.data);
        setError(null);
      } catch (err) {
        setError('도서 목록을 불러오는데 실패했습니다.');
        console.error('Error fetching books:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReadingRecords();
  }, []);

  const handleAddReadingRecord = async (bookData: { title: string; author: string }) => {
    try {
      const response = await api.post('/reading-records', {
        bookTitle: bookData.title,
        bookAuthor: bookData.author
      });
      
      const newReadingRecord: ReadingRecord = {
        id: response.data.id,
        bookTitle: bookData.title,
        bookAuthor: bookData.author
      };
      
      setReadingRecords([...readingRecords, newReadingRecord]);
      setIsAddBookModalOpen(false);
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

      <Modal
        isOpen={isAddBookModalOpen}
        onClose={() => setIsAddBookModalOpen(false)}
        title="새 책 추가"
      >
        <AddReadingRecordForm
          onSubmit={handleAddReadingRecord}
          onCancel={() => setIsAddBookModalOpen(false)}
        />
      </Modal>

      <Toast show={showToast}>
        {toastMessage}
      </Toast>
    </Container>
  );
};

export default ReadingRecordPage; 
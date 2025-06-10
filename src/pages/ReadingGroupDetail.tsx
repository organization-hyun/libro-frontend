import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { ReadingGroupItem, SharedReadingRecord, getReadingGroupById, getSharedReadingRecords, shareReadingRecord } from '../api/readingGroup';
import api from '@/api/apiClient';
import { ReadingRecord } from '../types/readingRecord';

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

const Section = styled.section`
  margin-top: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  font-weight: 600;
  margin-bottom: ${theme.spacing.lg};
`;

const Button = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: ${theme.spacing.lg};

  &:hover {
    background-color: ${theme.colors.primaryDark};
  }

  &:disabled {
    background-color: ${theme.colors.border};
    cursor: not-allowed;
  }
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

const SharedBookCard = styled(BookCard)`
  cursor: default;
  
  &:hover {
    transform: none;
    box-shadow: ${theme.shadows.sm};
  }
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
  font-weight: 600;
`;

const CardAuthor = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.sm};
`;

const UserInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.sm};
  border-bottom: 1px solid ${theme.colors.border};
`;

const UserName = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const ShareDate = styled.span`
  color: ${theme.colors.text.light};
  font-size: 0.9rem;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  width: 90%;
  max-width: 1000px;
  max-height: 80vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const ModalTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${theme.colors.text.primary};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  padding: 0;

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: ${theme.colors.text.secondary};
  padding: ${theme.spacing.xl} 0;
`;

const ReadingGroupDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [readingGroup, setReadingGroup] = useState<ReadingGroupItem | null>(null);
  const [sharedRecords, setSharedRecords] = useState<SharedReadingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [userRecords, setUserRecords] = useState<ReadingRecord[]>([]);
  const [isLoadingRecords, setIsLoadingRecords] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const [groupData, recordsData] = await Promise.all([
          getReadingGroupById(id),
          getSharedReadingRecords(id)
        ]);
        setReadingGroup(groupData);
        setSharedRecords(recordsData);
        setError(null);
      } catch (err) {
        setError('데이터를 불러오는데 실패했습니다.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const fetchUserRecords = async () => {
    try {
      setIsLoadingRecords(true);
      const response = await api.get('/reading-records');
      setUserRecords(response.data);
    } catch (err) {
      console.error('Error fetching user records:', err);
    } finally {
      setIsLoadingRecords(false);
    }
  };

  const handleShareClick = () => {
    fetchUserRecords();
    setIsShareModalOpen(true);
  };

  const handleRecordShare = async (recordId: number) => {
    if (!id) return;

    try {
      const sharedRecord = await shareReadingRecord(id, recordId);
      setSharedRecords([...sharedRecords, sharedRecord]);
      setIsShareModalOpen(false);
    } catch (err) {
      console.error('Error sharing record:', err);
      // TODO: Add error handling UI feedback
    }
  };

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

      <Section>
        <SectionTitle>공유된 독서 기록</SectionTitle>
        <Button onClick={handleShareClick}>내 독서 기록 공유하기</Button>
        
        <BookGrid>
          {sharedRecords.length > 0 ? (
            sharedRecords.map((record) => (
              <SharedBookCard key={record.readingRecordId}>
                <UserInfo>
                  <UserName>{record.writerName}</UserName>
                  <ShareDate>{new Date(record.sharedDate).toLocaleDateString()}</ShareDate>
                </UserInfo>
                <p>{record.review}</p>
              </SharedBookCard>
            ))
          ) : (
            <EmptyMessage>아직 공유된 독서 기록이 없습니다.</EmptyMessage>
          )}
        </BookGrid>
      </Section>

      {isShareModalOpen && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>공유할 독서 기록 선택</ModalTitle>
              <CloseButton onClick={() => setIsShareModalOpen(false)}>&times;</CloseButton>
            </ModalHeader>
            
            {isLoadingRecords ? (
              <LoadingText>독서 기록을 불러오는 중...</LoadingText>
            ) : userRecords.length > 0 ? (
              <BookGrid>
                {userRecords.map((record) => (
                  <BookCard key={record.id} onClick={() => handleRecordShare(record.id)}>
                    <CardTitle>{record.bookTitle}</CardTitle>
                    <CardAuthor>{record.bookAuthor}</CardAuthor>
                    <p>{record.review || '내용 없음'}</p>
                  </BookCard>
                ))}
              </BookGrid>
            ) : (
              <EmptyMessage>공유할 수 있는 독서 기록이 없습니다.</EmptyMessage>
            )}
          </ModalContent>
        </Modal>
      )}
    </DetailContainer>
  );
};

export default ReadingGroupDetail;
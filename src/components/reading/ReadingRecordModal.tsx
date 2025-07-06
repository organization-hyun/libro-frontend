import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { ReadingCompletion } from '../../types/readingRecord';
import { readingCompletionApi } from '../../api/readingRecord';
import { Modal } from '../common/Modal';
import LoadingSpinner from '../common/LoadingSpinner';
import { formatDuration, formatDateToKorean } from '../../utils/dateUtils';

// 공통 패딩 값
const MODAL_PADDING = theme.spacing.lg;

const ModalContent = styled.div`
  max-width: 500px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
`;

const DateHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
  padding: ${theme.spacing.lg} ${MODAL_PADDING} ${theme.spacing.md} ${MODAL_PADDING};
  border-bottom: 1px solid ${theme.colors.border};
  position: sticky;
  top: 0;
  background: ${theme.colors.background.white};
  z-index: 1;
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${theme.spacing.md};
  right: ${theme.spacing.md};
  background: none;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0;
  line-height: 1;
  z-index: 2;

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

const DateTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  margin: 0;
  font-weight: 600;
`;

const DateSubtitle = styled.p`
  color: ${theme.colors.text.secondary};
  margin: ${theme.spacing.xs} 0 0 0;
  font-size: 0.9rem;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0 ${MODAL_PADDING} ${theme.spacing.lg} ${MODAL_PADDING};
  padding: ${theme.spacing.md};
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing.xs};
`;

const RecordList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  padding: 0 ${MODAL_PADDING} ${theme.spacing.lg} ${MODAL_PADDING};
`;

const RecordItem = styled.div`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${theme.colors.background.white};
  transition: all ${theme.transitions.default};

  &:hover {
    box-shadow: ${theme.shadows.sm};
    transform: translateY(-1px);
  }
`;

const RecordHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};
`;

const RecordTime = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
`;

const RecordDuration = styled.div`
  font-weight: 600;
  color: ${theme.colors.primary};
  font-size: 0.9rem;
`;

const RecordNote = styled.div`
  color: ${theme.colors.text.primary};
  font-size: 0.9rem;
  line-height: 1.4;
  margin-top: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.sm};
  border-left: 3px solid ${theme.colors.primary};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} ${MODAL_PADDING};
  color: ${theme.colors.text.secondary};
`;

const EmptyIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.md};
  opacity: 0.5;
`;

interface ReadingRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string | null;
}

const ReadingRecordModal: React.FC<ReadingRecordModalProps> = ({
  isOpen,
  onClose,
  selectedDate
}) => {
  const [records, setRecords] = useState<ReadingCompletion[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && selectedDate) {
      fetchDayRecords();
    }
  }, [isOpen, selectedDate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const fetchDayRecords = async () => {
    if (!selectedDate) return;
    
    try {
      setIsLoading(true);
      const [year, month] = selectedDate.split('-').map(Number);
      
      // 해당 월의 모든 기록을 가져온 후 선택된 날짜만 필터링
      const monthRecords = await readingCompletionApi.getReadingCompletionsByMonth(year, month);
      const dayRecords = monthRecords.filter(record => record.date === selectedDate);
      setRecords(dayRecords);
    } catch (error) {
      console.error('독서 기록을 불러오는데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };



  const stats = useMemo(() => {
    const totalDuration = records.reduce((sum, record) => sum + record.duration, 0);
    const totalSessions = records.length;
    
    return {
      totalDuration,
      totalSessions
    };
  }, [records]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <DateHeader>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <DateTitle>{formatDateToKorean(selectedDate || '')}</DateTitle>
          <DateSubtitle>독서 기록</DateSubtitle>
        </DateHeader>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: `${theme.spacing.xl} ${MODAL_PADDING}` }}>
            <LoadingSpinner />
          </div>
        ) : records.length > 0 ? (
          <>
            <StatsContainer>
              <StatItem>
                <StatValue>{stats.totalSessions}</StatValue>
                <StatLabel>독서 횟수</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{formatDuration(stats.totalDuration)}</StatValue>
                <StatLabel>총 독서 시간</StatLabel>
              </StatItem>
            </StatsContainer>

            <RecordList>
              {records.map((record, index) => (
                <RecordItem key={record.id || index}>
                  <RecordHeader>
                    <RecordTime>
                      {record.date} • {index + 1}번째 기록
                    </RecordTime>
                    <RecordDuration>
                      {formatDuration(record.duration)}
                    </RecordDuration>
                  </RecordHeader>
                  {record.note && (
                    <RecordNote>
                      {record.note}
                    </RecordNote>
                  )}
                </RecordItem>
              ))}
            </RecordList>
          </>
        ) : (
          <EmptyState>
            <EmptyIcon>📚</EmptyIcon>
            <p>이 날에는 독서 기록이 없습니다.</p>
            <p style={{ fontSize: '0.9rem', marginTop: theme.spacing.sm }}>
              독서 타이머를 사용해서 첫 기록을 남겨보세요!
            </p>
          </EmptyState>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ReadingRecordModal; 
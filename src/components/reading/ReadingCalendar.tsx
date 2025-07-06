import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { ReadingCompletion } from '../../types/readingRecord';
import { readingCompletionApi } from '../../api/readingRecord';

const CalendarContainer = styled.div`
  background: ${theme.colors.background.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  margin-bottom: ${theme.spacing.lg};
`;

const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.lg};
`;

const MonthTitle = styled.h2`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  font-weight: 600;
`;

const NavigationButton = styled.button`
  background: ${theme.colors.background.light};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.primary};
    color: white;
    border-color: ${theme.colors.primary};
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
`;

const DayHeader = styled.div`
  text-align: center;
  padding: ${theme.spacing.sm};
  font-weight: 600;
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const DayCell = styled.div<{ 
  isCurrentMonth: boolean; 
  isToday: boolean; 
  hasReadingRecord: boolean;
  isSelected: boolean;
}>`
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  position: relative;
  transition: all ${theme.transitions.default};
  
  background: ${props => {
    if (props.isSelected) return theme.colors.primary;
    if (props.isToday) return theme.colors.background.light;
    return 'transparent';
  }};
  
  color: ${props => {
    if (props.isSelected) return 'white';
    if (props.isCurrentMonth) return theme.colors.text.primary;
    return theme.colors.text.light;
  }};

  &:hover {
    background: ${props => props.isSelected ? theme.colors.primaryDark : theme.colors.background.light};
    transform: translateY(-1px);
  }

  ${theme.mediaQueries.mobile} {
    padding: 2px;
    font-size: 0.8rem;
  }
`;

const ReadingIndicator = styled.div<{ intensity: number }>`
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${props => {
    const alpha = Math.min(0.3 + (props.intensity * 0.7), 1);
    return `rgba(0, 123, 255, ${alpha})`;
  }};
`;

const DayNumber = styled.span`
  font-weight: 500;
  z-index: 1;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: ${theme.spacing.lg};
  padding: ${theme.spacing.md};
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-top: ${theme.spacing.xs};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.text.secondary};
`;

interface ReadingCalendarProps {
  onDayClick?: (date: string) => void;
}

const ReadingCalendar: React.FC<ReadingCalendarProps> = ({ onDayClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [readingCompletions, setReadingCompletions] = useState<ReadingCompletion[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  useEffect(() => {
    fetchReadingCompletions();
  }, [currentDate]);

  const fetchReadingCompletions = async () => {
    try {
      setIsLoading(true);
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const completions = await readingCompletionApi.getReadingCompletionsByMonth(year, month);
      setReadingCompletions(completions);
    } catch (error) {
      console.error('독서 완료 기록을 불러오는데 실패했습니다:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();

    const days = [];
    
    // 이전 달의 마지막 날들
    const prevMonth = new Date(year, month - 1, 0);
    const prevMonthDays = prevMonth.getDate();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false
      });
    }

    // 현재 달의 날들
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }

    // 다음 달의 첫 날들
    const remainingDays = 42 - days.length; // 6주 * 7일 = 42
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }

    return days;
  };

  const getReadingIntensity = (date: Date) => {
    const dateString = formatDateToYYYYMMDD(date);
    const dayCompletions = readingCompletions.filter(
      completion => completion.date === dateString
    );
    
    if (dayCompletions.length === 0) return 0;
    
    // 총 독서 시간을 기준으로 강도 계산 (최대 2시간 = 120분 기준)
    const totalDuration = dayCompletions.reduce((sum, completion) => sum + completion.duration, 0);
    return Math.min(totalDuration / 120, 1);
  };

  const formatDateToYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const handleDayClick = (date: Date) => {
    const dateString = formatDateToYYYYMMDD(date);
    setSelectedDate(selectedDate === dateString ? null : dateString);
    onDayClick?.(dateString);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };



  const getMonthStats = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const monthCompletions = readingCompletions.filter(completion => {
      const completionDate = new Date(completion.date);
      return completionDate.getFullYear() === year && completionDate.getMonth() + 1 === month;
    });

    const totalDays = monthCompletions.reduce((days, completion) => {
      if (!days.includes(completion.date)) {
        days.push(completion.date);
      }
      return days;
    }, [] as string[]).length;

    const totalMinutes = monthCompletions.reduce((sum, completion) => sum + completion.duration, 0);

    return {
      totalDays,
      totalMinutes,
      totalSessions: monthCompletions.length
    };
  };

  const stats = getMonthStats();

  return (
    <CalendarContainer>
      <CalendarHeader>
        <NavigationButton onClick={goToPreviousMonth}>‹</NavigationButton>
        <MonthTitle>
          {currentDate.getFullYear()}년 {currentDate.getMonth() + 1}월
        </MonthTitle>
        <NavigationButton onClick={goToNextMonth}>›</NavigationButton>
      </CalendarHeader>

      <CalendarGrid>
        {daysOfWeek.map(day => (
          <DayHeader key={day}>{day}</DayHeader>
        ))}
        
        {getDaysInMonth(currentDate).map((day, index) => {
          const dateString = formatDateToYYYYMMDD(day.date);
          const intensity = getReadingIntensity(day.date);
          
          return (
            <DayCell
              key={index}
              isCurrentMonth={day.isCurrentMonth}
              isToday={isToday(day.date)}
              hasReadingRecord={intensity > 0}
              isSelected={selectedDate === dateString}
              onClick={() => handleDayClick(day.date)}
            >
              <DayNumber>{day.date.getDate()}</DayNumber>
              {intensity > 0 && <ReadingIndicator intensity={intensity} />}
            </DayCell>
          );
        })}
      </CalendarGrid>

      <StatsContainer>
        <StatItem>
          <StatValue>{stats.totalDays}</StatValue>
          <StatLabel>독서한 날</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{stats.totalSessions}</StatValue>
          <StatLabel>독서 횟수</StatLabel>
        </StatItem>
        <StatItem>
          <StatValue>{Math.round(stats.totalMinutes / 60 * 10) / 10}</StatValue>
          <StatLabel>총 시간(시간)</StatLabel>
        </StatItem>
      </StatsContainer>

      {readingCompletions.length === 0 && !isLoading && (
        <EmptyState>
          이번 달에는 아직 독서 기록이 없습니다.<br />
          독서 타이머를 사용해서 첫 기록을 남겨보세요!
        </EmptyState>
      )}
    </CalendarContainer>
  );
};

export default ReadingCalendar; 
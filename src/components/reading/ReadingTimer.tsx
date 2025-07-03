import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: ${theme.spacing.xl};
  background: ${theme.colors.background.main};
`;

const TimerCard = styled.div`
  background: ${theme.colors.background.white};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
  max-width: 500px;
  width: 100%;
`;

const TimerDisplay = styled.div`
  font-size: 4rem;
  font-weight: bold;
  color: ${theme.colors.primary};
  margin: ${theme.spacing.lg} 0;
  font-family: 'Courier New', monospace;

  ${theme.mediaQueries.mobile} {
    font-size: 3rem;
  }
`;

const TimerStatus = styled.div`
  font-size: 1.2rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.lg};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  margin-top: ${theme.spacing.lg};
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  min-width: 120px;

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: white;
          &:hover {
            background: ${theme.colors.primaryDark};
            transform: translateY(-2px);
          }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.background.light};
          color: ${theme.colors.text.primary};
          border: 2px solid ${theme.colors.border};
          &:hover {
            background: ${theme.colors.background.main};
            transform: translateY(-2px);
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error};
          color: white;
          &:hover {
            background: ${theme.colors.errorDark};
            transform: translateY(-2px);
          }
        `;
      default:
        return `
          background: ${theme.colors.primary};
          color: white;
          &:hover {
            background: ${theme.colors.primaryDark};
            transform: translateY(-2px);
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const TimeSelectionContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const TimeOptions = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
`;

const TimeOption = styled.button<{ selected: boolean }>`
  padding: ${theme.spacing.md};
  border: 2px solid ${props => props.selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.selected ? theme.colors.primary : theme.colors.background.white};
  color: ${props => props.selected ? 'white' : theme.colors.text.primary};
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.full};
  overflow: hidden;
  margin: ${theme.spacing.lg} 0;
`;

const ProgressFill = styled.div<{ progress: number }>`
  height: 100%;
  background: ${theme.colors.primary};
  width: ${props => props.progress}%;
  transition: width 0.3s ease;
`;

interface ReadingTimerProps {
  onComplete?: () => void;
}

const ReadingTimer: React.FC<ReadingTimerProps> = ({ onComplete }) => {
  const [selectedTime, setSelectedTime] = useState<number>(10);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const timeOptions = [5, 10, 15, 30];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (): number => {
    const totalTime = selectedTime * 60;
    return totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  };

  const startTimer = useCallback(() => {
    const totalTime = selectedTime * 60;
    setTimeLeft(totalTime);
    setIsRunning(true);
    setIsPaused(false);
  }, [selectedTime]);

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setTimeLeft(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleTimeOptionClick = (time: number) => {
    setSelectedTime(time);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsPaused(false);
            onComplete?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused, timeLeft, onComplete]);

  if (!isRunning) {
    return (
      <TimerContainer>
        <TimerCard>
          <h2>오늘의 독서 시작하기</h2>
          <p>독서할 시간을 선택해주세요</p>
          
          <TimeSelectionContainer>
            <TimeOptions>
              {timeOptions.map(time => (
                <TimeOption
                  key={time}
                  selected={selectedTime === time}
                  onClick={() => handleTimeOptionClick(time)}
                >
                  {time}분
                </TimeOption>
              ))}
            </TimeOptions>
          </TimeSelectionContainer>

          <Button onClick={startTimer} variant="primary">
            독서 시작하기
          </Button>
        </TimerCard>
      </TimerContainer>
    );
  }

  return (
    <TimerContainer>
      <TimerCard>
        <h2>독서 타이머</h2>
        
        <TimerDisplay>
          {formatTime(timeLeft)}
        </TimerDisplay>
        
        <TimerStatus>
          {isPaused ? '일시정지됨' : '독서 중...'}
        </TimerStatus>
        
        <ProgressBar>
          <ProgressFill progress={getProgress()} />
        </ProgressBar>
        
        <ButtonGroup>
          {isPaused ? (
            <Button onClick={resumeTimer} variant="primary">
              재시작
            </Button>
          ) : (
            <Button onClick={pauseTimer} variant="secondary">
              일시정지
            </Button>
          )}
          <Button onClick={resetTimer} variant="danger">
            종료
          </Button>
        </ButtonGroup>
      </TimerCard>
    </TimerContainer>
  );
};

export default ReadingTimer; 
import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { readingCompletionApi } from '../../api/readingRecord';

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

// 모달 관련 스타일
const CompletionModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.md};

  ${theme.mediaQueries.mobile} {
    align-items: flex-start;
    padding: ${theme.spacing.sm};
    overflow-y: auto;
    padding-top: 10vh;
  }
`;

const CompletionModalContent = styled.div`
  background: ${theme.colors.background.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  max-width: 550px;
  width: 90%;
  text-align: center;
  box-shadow: ${theme.shadows.lg};
  border: 1px solid ${theme.colors.border};

  ${theme.mediaQueries.mobile} {
    width: 95%;
    max-width: none;
    padding: ${theme.spacing.lg};
    margin: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
    max-height: 90vh;
    overflow-y: auto;
  }
`;

const CompletionTitle = styled.h2`
  font-size: 1.8rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  ${theme.mediaQueries.mobile} {
    font-size: 1.5rem;
    flex-direction: column;
    gap: ${theme.spacing.xs};
  }
`;

const CompletionMessage = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.6;
  background: ${theme.colors.background.light};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  border-left: 4px solid ${theme.colors.primary};

  ${theme.mediaQueries.mobile} {
    font-size: 1rem;
    padding: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.lg};
    line-height: 1.5;
  }
`;

const NotesTextarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${theme.spacing.lg};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  margin-bottom: ${theme.spacing.lg};
  background: ${theme.colors.background.light};
  transition: all ${theme.transitions.default};
  line-height: 1.6;
  color: ${theme.colors.text.primary};
  box-sizing: border-box;

  &::placeholder {
    color: ${theme.colors.text.light};
    font-style: italic;
  }

  &:hover {
    border-color: ${theme.colors.text.secondary};
    background: ${theme.colors.background.white};
  }

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    background: ${theme.colors.background.white};
    box-shadow: 0 0 0 3px ${theme.colors.primary}15;
    transform: translateY(-1px);
  }

  ${theme.mediaQueries.mobile} {
    min-height: 80px;
    max-height: 120px;
    padding: ${theme.spacing.md};
    font-size: 16px;
    border-radius: ${theme.borderRadius.md};
    margin-bottom: ${theme.spacing.md};
    resize: none;
    
    &:focus {
      transform: none;
    }
  }
`;

const CharacterCount = styled.div`
  text-align: right;
  font-size: 0.85rem;
  color: ${theme.colors.text.light};
  margin-bottom: ${theme.spacing.md};
  font-style: italic;

  ${theme.mediaQueries.mobile} {
    font-size: 0.8rem;
    margin-bottom: ${theme.spacing.sm};
  }
`;

const TextareaContainer = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.lg};

  ${theme.mediaQueries.mobile} {
    margin-bottom: ${theme.spacing.md};
  }
`;

const TextareaLabel = styled.label`
  display: block;
  font-size: 0.95rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.sm};
  font-weight: 500;

  ${theme.mediaQueries.mobile} {
    font-size: 0.9rem;
    margin-bottom: ${theme.spacing.xs};
  }
`;

const InspirationText = styled.div`
  font-size: 0.9rem;
  color: ${theme.colors.text.light};
  margin-top: ${theme.spacing.sm};
  font-style: italic;
  line-height: 1.4;

  ${theme.mediaQueries.mobile} {
    font-size: 0.8rem;
    margin-top: ${theme.spacing.xs};
    line-height: 1.3;
  }
`;

const CompletionButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-top: ${theme.spacing.lg};

  ${theme.mediaQueries.mobile} {
    flex-direction: column;
    gap: ${theme.spacing.sm};
    margin-top: ${theme.spacing.md};
  }
`;

const CompletionButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  min-width: 140px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return `
          background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
          }
        `;
      case 'secondary':
        return `
          background: ${theme.colors.background.light};
          color: ${theme.colors.text.primary};
          border: 2px solid ${theme.colors.border};
          &:hover {
            background: ${theme.colors.background.main};
            border-color: ${theme.colors.text.secondary};
            transform: translateY(-1px);
          }
        `;
      default:
        return `
          background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 123, 255, 0.4);
          }
        `;
    }
  }}

  ${theme.mediaQueries.mobile} {
    min-width: 100%;
    padding: ${theme.spacing.md} ${theme.spacing.lg};
    font-size: 16px;
    border-radius: ${theme.borderRadius.md};
    
    &:hover {
      transform: none;
    }
    
    &:active {
      transform: scale(0.98);
    }
  }
`;

const ModeSelectionContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const ModeOptions = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  margin-bottom: ${theme.spacing.lg};
`;

const ModeOption = styled.button<{ selected: boolean }>`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border: 2px solid ${props => props.selected ? theme.colors.primary : theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  background: ${props => props.selected ? theme.colors.primary : theme.colors.background.white};
  color: ${props => props.selected ? 'white' : theme.colors.text.primary};
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  min-width: 120px;

  &:hover {
    border-color: ${theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const ModeDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${theme.spacing.lg};
`;

interface ReadingTimerProps {
  onComplete?: () => void;
  selectedBook?: {
    id: number;
    title: string;
    author: string;
  };
}

type TimerMode = 'timer' | 'stopwatch';

const ReadingTimer: React.FC<ReadingTimerProps> = ({ onComplete, selectedBook }) => {
  const [mode, setMode] = useState<TimerMode>('timer');
  const [selectedTime, setSelectedTime] = useState<number>(10);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);
  const [completionNotes, setCompletionNotes] = useState<string>('');

  const timeOptions = [5, 10, 15, 30];

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = (): number => {
    if (mode === 'timer') {
      const totalTime = selectedTime * 60;
      return totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
    } else {
      // 스탑워치 모드에서는 진행률을 표시하지 않음
      return 0;
    }
  };

  const startTimer = useCallback(() => {
    if (mode === 'timer') {
      const totalTime = selectedTime * 60;
      setTimeLeft(totalTime);
    } else {
      setElapsedTime(0);
    }
    setIsRunning(true);
    setIsPaused(false);
  }, [selectedTime, mode]);

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    if (mode === 'stopwatch' && elapsedTime > 0) {
      // 스탑워치 모드에서 시간이 측정된 경우 모달 표시
      setShowCompletionModal(true);
    } else {
      // 타이머 모드이거나 스탑워치에서 시간이 0인 경우 그냥 종료
      setTimeLeft(0);
      setElapsedTime(0);
      setIsRunning(false);
      setIsPaused(false);
    }
  };

  const handleTimeOptionClick = (time: number) => {
    setSelectedTime(time);
  };

  const handleModeChange = (newMode: TimerMode) => {
    setMode(newMode);
    // 모드 변경 시 타이머 상태 초기화
    setTimeLeft(0);
    setElapsedTime(0);
    setIsRunning(false);
    setIsPaused(false);
  };

  const formatDateToYYYYMMDD = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const saveReadingCompletion = async () => {
    try {
      const today = formatDateToYYYYMMDD(new Date());
      const duration = mode === 'timer' ? selectedTime : Math.ceil(elapsedTime / 60);
      
      await readingCompletionApi.createReadingCompletion({
        date: today,
        duration: duration,
        bookId: selectedBook?.id,
        note: completionNotes.trim() || undefined
      });
      
      setShowCompletionModal(false);
      setCompletionNotes('');
      setTimeLeft(0);
      setElapsedTime(0);
      setIsRunning(false);
      setIsPaused(false);
      onComplete?.();
    } catch (error) {
      console.error('독서 완료 기록 저장에 실패했습니다:', error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && !isPaused) {
      interval = setInterval(() => {
        if (mode === 'timer') {
          setTimeLeft(prev => {
            const newTime = prev - 1;
            if (newTime <= 0) {
              setIsRunning(false);
              setIsPaused(false);
              setShowCompletionModal(true);
              return 0;
            }
            return newTime;
          });
        } else {
          // 스탑워치 모드
          setElapsedTime(prev => prev + 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning, isPaused, timeLeft, mode]);

  // 타이머가 0이 되었을 때 즉시 모달 표시
  useEffect(() => {
    if (timeLeft === 0 && isRunning && mode === 'timer') {
      setIsRunning(false);
      setIsPaused(false);
      setShowCompletionModal(true);
    }
  }, [timeLeft, isRunning, mode]);

  if (!isRunning && !showCompletionModal) {
    return (
      <TimerContainer>
        <TimerCard>
          <h2>오늘의 독서 시작하기</h2>
          <p>독서 모드를 선택해주세요</p>
          
          <ModeSelectionContainer>
            <ModeOptions>
              <ModeOption
                selected={mode === 'timer'}
                onClick={() => handleModeChange('timer')}
              >
                ⏰ 타이머
              </ModeOption>
              <ModeOption
                selected={mode === 'stopwatch'}
                onClick={() => handleModeChange('stopwatch')}
              >
                ⏱️ 스탑워치
              </ModeOption>
            </ModeOptions>
            
            <ModeDescription>
              {mode === 'timer' 
                ? '정해진 시간 동안 독서를 진행합니다. 시간이 끝나면 자동으로 완료됩니다.'
                : '원하는 만큼 자유롭게 독서를 진행합니다. 언제든지 멈출 수 있습니다.'
              }
            </ModeDescription>
          </ModeSelectionContainer>

          {mode === 'timer' && (
            <TimeSelectionContainer>
              <p>독서할 시간을 선택해주세요</p>
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
          )}

          <Button onClick={startTimer} variant="primary">
            {mode === 'timer' ? '독서 시작하기' : '스탑워치 시작'}
          </Button>
        </TimerCard>
      </TimerContainer>
    );
  }

  return (
    <>
      <TimerContainer>
        <TimerCard>
          <h2>{mode === 'timer' ? '독서 타이머' : '독서 스탑워치'}</h2>
          
          <TimerDisplay>
            {mode === 'timer' ? formatTime(timeLeft) : formatTime(elapsedTime)}
          </TimerDisplay>
          
          <TimerStatus>
            {isPaused ? '일시정지됨' : mode === 'timer' ? '독서 중...' : '독서 진행 중...'}
          </TimerStatus>
          
          {mode === 'timer' && (
            <ProgressBar>
              <ProgressFill progress={getProgress()} />
            </ProgressBar>
          )}
          
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
              {mode === 'timer' ? '종료' : '기록 완료'}
            </Button>
          </ButtonGroup>
        </TimerCard>
      </TimerContainer>

      {showCompletionModal && (
        <CompletionModal>
          <CompletionModalContent>
            <CompletionTitle>
              <span>🎉</span>
              <span>독서 완료!</span>
            </CompletionTitle>
            <CompletionMessage>
              <strong>
                {mode === 'timer' 
                  ? `${selectedTime}분` 
                  : `${Math.floor(elapsedTime / 60)}분 ${elapsedTime % 60}초`
                }
              </strong> 동안의 소중한 독서 시간을 완료하셨습니다!<br />
              {selectedBook ? `"${selectedBook.title}"` : '오늘의 독서'}에 대한 기록을 캘린더에 남겨보세요.
            </CompletionMessage>
            
            <TextareaContainer>
              <TextareaLabel htmlFor="completion-notes">
                📝 오늘의 독서 기록
              </TextareaLabel>
              <NotesTextarea
                id="completion-notes"
                placeholder="오늘 읽은 내용 중 인상깊었던 부분이나 생각을 자유롭게 적어보세요..."
                value={completionNotes}
                onChange={(e) => setCompletionNotes(e.target.value)}
                maxLength={500}
              />
              <CharacterCount>
                {completionNotes.length} / 500
              </CharacterCount>
              <InspirationText>
                💡 예시: "주인공의 성장 과정이 인상적이었다", "이 문장이 마음에 남는다", "오늘 읽은 내용을 통해 새로운 관점을 얻었다"
              </InspirationText>
            </TextareaContainer>
            
            <CompletionButtonGroup>
              <CompletionButton 
                variant="secondary" 
                onClick={() => {
                  setShowCompletionModal(false);
                  setCompletionNotes('');
                  setTimeLeft(0);
                  setElapsedTime(0);
                  setIsRunning(false);
                  setIsPaused(false);
                  onComplete?.();
                }}
              >
                건너뛰기
              </CompletionButton>
              <CompletionButton 
                variant="primary" 
                onClick={saveReadingCompletion}
              >
                기록 저장
              </CompletionButton>
            </CompletionButtonGroup>
          </CompletionModalContent>
        </CompletionModal>
      )}
    </>
  );
};

export default ReadingTimer; 
export interface TimerState {
  selectedTime: number;
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
}

export interface TimerActions {
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  handleTimeOptionClick: (time: number) => void;
}

export interface ReadingTimerProps {
  onComplete?: () => void;
}

export type TimeOption = 5 | 10 | 15 | 30; 
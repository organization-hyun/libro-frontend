import { useState, useEffect, useCallback, useMemo } from 'react';
import type { TimeOption } from '../types/timer';

interface UseTimerProps {
  onComplete?: () => void;
}

interface UseTimerReturn {
  selectedTime: number;
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
  progress: number;
  formattedTime: string;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  handleTimeOptionClick: (time: TimeOption) => void;
}

export const useTimer = ({ onComplete }: UseTimerProps = {}): UseTimerReturn => {
  const [selectedTime, setSelectedTime] = useState<TimeOption>(10);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const formattedTime = useMemo(() => formatTime(timeLeft), [timeLeft, formatTime]);

  const progress = useMemo((): number => {
    const totalTime = selectedTime * 60;
    return totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  }, [selectedTime, timeLeft]);

  const startTimer = useCallback(() => {
    const totalTime = selectedTime * 60;
    setTimeLeft(totalTime);
    setIsRunning(true);
    setIsPaused(false);
  }, [selectedTime]);

  const pauseTimer = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsPaused(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(0);
    setIsRunning(false);
    setIsPaused(false);
  }, []);

  const handleTimeOptionClick = useCallback((time: TimeOption) => {
    setSelectedTime(time);
  }, []);

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

  return {
    selectedTime,
    timeLeft,
    isRunning,
    isPaused,
    progress,
    formattedTime,
    startTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    handleTimeOptionClick,
  };
}; 
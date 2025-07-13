import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div<{ fullScreen?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  gap: ${theme.spacing.md};
  
  ${({ fullScreen }) => fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.9);
    z-index: 1000;
  `}
`;

const Spinner = styled.div<{ size: 'sm' | 'md' | 'lg'; color?: string }>`
  width: ${({ size }) => {
    switch (size) {
      case 'sm': return '24px';
      case 'lg': return '60px';
      default: return '40px';
    }
  }};
  height: ${({ size }) => {
    switch (size) {
      case 'sm': return '24px';
      case 'lg': return '60px';
      default: return '40px';
    }
  }};
  border: ${({ size }) => {
    switch (size) {
      case 'sm': return '2px';
      case 'lg': return '6px';
      default: return '4px';
    }
  }} solid ${theme.colors.background.light};
  border-top: ${({ size }) => {
    switch (size) {
      case 'sm': return '2px';
      case 'lg': return '6px';
      default: return '4px';
    }
  }} solid ${({ color }) => color || theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 1rem;
  margin: 0;
`;

interface LoadingSpinnerProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  text = '로딩 중...',
  size = 'md',
  fullScreen = false,
  color
}) => {
  return (
    <SpinnerContainer fullScreen={fullScreen}>
      <Spinner size={size} color={color} />
      <LoadingText>{text}</LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner; 
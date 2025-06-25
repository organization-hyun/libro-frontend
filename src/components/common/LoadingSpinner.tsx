import React from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl};
  gap: ${theme.spacing.md};
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${theme.colors.background.light};
  border-top: 4px solid ${theme.colors.primary};
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
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text = '로딩 중...' }) => {
  return (
    <SpinnerContainer>
      <Spinner />
      <LoadingText>{text}</LoadingText>
    </SpinnerContainer>
  );
};

export default LoadingSpinner; 
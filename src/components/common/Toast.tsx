import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { theme } from '../../styles/theme';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{ 
  isVisible: boolean; 
  type: 'success' | 'error' | 'info';
  isClosing: boolean;
}>`
  position: fixed;
  top: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background: ${({ type }) => 
    type === 'success' ? '#28a745' : 
    type === 'error' ? theme.colors.error : 
    theme.colors.primary
  };
  color: white;
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.sm};
  box-shadow: ${theme.shadows.md};
  z-index: 2000;
  max-width: 300px;
  animation: ${({ isVisible, isClosing }) => 
    isVisible && !isClosing ? slideIn : slideOut
  } 0.3s ease-in-out;
  display: ${({ isVisible }) => isVisible ? 'block' : 'none'};
`;

const ToastContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const ToastIcon = styled.span`
  font-size: 1.2rem;
`;

const ToastMessage = styled.span`
  font-weight: 500;
`;

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  isVisible, 
  onClose, 
  duration = 3000 
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return '';
    }
  };

  if (!isVisible) return null;

  return (
    <ToastContainer isVisible={isVisible} type={type} isClosing={false}>
      <ToastContent>
        <ToastIcon>{getIcon()}</ToastIcon>
        <ToastMessage>{message}</ToastMessage>
      </ToastContent>
    </ToastContainer>
  );
};

export default Toast; 
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface CloseButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StyledCloseButton = styled.button<{ size: 'sm' | 'md' | 'lg' }>`
  background: none;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  font-size: ${({ size }) => {
    switch (size) {
      case 'sm': return '1.2rem';
      case 'lg': return '2rem';
      default: return '1.5rem';
    }
  }};
  padding: 0;
  line-height: 1;
  transition: color ${theme.transitions.default};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${theme.colors.text.primary};
  }
`;

export const CloseButton: React.FC<CloseButtonProps> = ({ 
  onClick, 
  children = '×',
  size = 'md',
  className 
}) => {
  return (
    <StyledCloseButton onClick={onClick} size={size} className={className}>
      {children}
    </StyledCloseButton>
  );
}; 
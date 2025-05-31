import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface FloatingButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button = styled.button`
  position: fixed;
  bottom: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  width: 60px;
  height: 60px;
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.primary};
  color: ${theme.colors.background.white};
  border: none;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: ${theme.shadows.md};
  transition: transform ${theme.transitions.default};

  &:hover {
    transform: scale(1.1);
  }
`;

export const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, children }) => {
  return (
    <Button onClick={onClick}>
      {children}
    </Button>
  );
}; 
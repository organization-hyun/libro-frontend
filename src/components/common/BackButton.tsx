import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface BackButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}

const StyledBackButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: 0;
  margin-bottom: ${theme.spacing.md};
  transition: color ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.primary};
  }

  ${theme.mediaQueries.mobile} {
    font-size: 0.9rem;
  }
`;

export const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  children = '← 돌아가기',
  className 
}) => {
  return (
    <StyledBackButton onClick={onClick} className={className}>
      {children}
    </StyledBackButton>
  );
}; 
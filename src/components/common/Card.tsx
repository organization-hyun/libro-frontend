import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  style?: React.CSSProperties;
}

const CardContainer = styled.div<{ clickable?: boolean }>`
  background: ${theme.colors.background.white};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadows.sm};
  transition: transform ${theme.transitions.default};

  ${({ clickable }) => clickable && `
    cursor: pointer;
    &:hover {
      transform: translateY(-4px);
    }
  `}
`;

export const Card: React.FC<CardProps> = ({ children, onClick, style }) => {
  return (
    <CardContainer clickable={!!onClick} onClick={onClick} style={style}>
      {children}
    </CardContainer>
  );
}; 
 
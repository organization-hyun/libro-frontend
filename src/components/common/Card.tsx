import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  hoverable?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
}

const StyledCard = styled.div<{ hoverable?: boolean; padding: 'sm' | 'md' | 'lg' }>`
  background: ${theme.colors.background.white};
  border-radius: ${theme.borderRadius.md};
  padding: ${({ padding }) => {
    switch (padding) {
      case 'sm': return theme.spacing.sm;
      case 'lg': return theme.spacing.xl;
      default: return theme.spacing.lg;
    }
  }};
  box-shadow: ${theme.shadows.sm};
  transition: all ${theme.transitions.default};
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;

  ${({ hoverable }) => hoverable && `
    cursor: pointer;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 123, 255, 0.1), transparent);
      transition: left 0.5s ease;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: ${theme.shadows.md};
      border-color: ${theme.colors.primary};
      
      &::before {
        left: 100%;
      }
    }

    &:active {
      transform: translateY(-2px);
    }
  `}
`;

export const Card: React.FC<CardProps> = ({
  children,
  onClick,
  hoverable = false,
  padding = 'md',
  className
}) => {
  return (
    <StyledCard
      onClick={onClick}
      hoverable={hoverable}
      padding={padding}
      className={className}
    >
      {children}
    </StyledCard>
  );
}; 
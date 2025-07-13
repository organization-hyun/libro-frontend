import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface LayoutProps {
  children: React.ReactNode;
  maxWidth?: string;
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Container = styled.div<{ maxWidth: string; padding: 'sm' | 'md' | 'lg' | 'xl' }>`
  max-width: ${({ maxWidth }) => maxWidth};
  margin: 0 auto;
  padding: ${({ padding }) => {
    switch (padding) {
      case 'sm': return theme.spacing.sm;
      case 'lg': return theme.spacing.xl;
      case 'xl': return theme.spacing.xl;
      default: return theme.spacing.lg;
    }
  }};

  ${theme.mediaQueries.mobile} {
    padding: ${({ padding }) => {
      switch (padding) {
        case 'sm': return theme.spacing.xs;
        case 'lg': return theme.spacing.lg;
        case 'xl': return theme.spacing.lg;
        default: return theme.spacing.md;
      }
    }};
  }
`;

export const Layout: React.FC<LayoutProps> = ({
  children,
  maxWidth = '1200px',
  padding = 'lg',
  className
}) => {
  return (
    <Container maxWidth={maxWidth} padding={padding} className={className}>
      {children}
    </Container>
  );
};

// 섹션 컴포넌트
interface SectionProps {
  children: React.ReactNode;
  margin?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SectionContainer = styled.section<{ margin: 'sm' | 'md' | 'lg' | 'xl' }>`
  margin-bottom: ${({ margin }) => {
    switch (margin) {
      case 'sm': return theme.spacing.sm;
      case 'lg': return theme.spacing.xl;
      case 'xl': return theme.spacing.xl;
      default: return theme.spacing.lg;
    }
  }};
`;

export const Section: React.FC<SectionProps> = ({
  children,
  margin = 'lg',
  className
}) => {
  return (
    <SectionContainer margin={margin} className={className}>
      {children}
    </SectionContainer>
  );
};

// 헤더 컴포넌트
interface HeaderProps {
  children: React.ReactNode;
  margin?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const HeaderContainer = styled.header<{ margin: 'sm' | 'md' | 'lg' | 'xl' }>`
  margin-bottom: ${({ margin }) => {
    switch (margin) {
      case 'sm': return theme.spacing.sm;
      case 'lg': return theme.spacing.xl;
      case 'xl': return theme.spacing.xl;
      default: return theme.spacing.lg;
    }
  }};
`;

export const Header: React.FC<HeaderProps> = ({
  children,
  margin = 'xl',
  className
}) => {
  return (
    <HeaderContainer margin={margin} className={className}>
      {children}
    </HeaderContainer>
  );
}; 
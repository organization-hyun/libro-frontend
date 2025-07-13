import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const StyledButton = styled.button<ButtonProps>`
  padding: ${({ size = 'md' }) => {
    switch (size) {
      case 'sm': return `${theme.spacing.xs} ${theme.spacing.sm}`;
      case 'lg': return `${theme.spacing.md} ${theme.spacing.xl}`;
      default: return `${theme.spacing.sm} ${theme.spacing.lg}`;
    }
  }};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: ${({ size = 'md' }) => {
    switch (size) {
      case 'sm': return '0.9rem';
      case 'lg': return '1.1rem';
      default: return '1rem';
    }
  }};
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.xs};

  ${({ variant = 'secondary', disabled }) => {
    if (disabled) {
      return `
        background: ${theme.colors.disabled};
        color: white;
        cursor: not-allowed;
        opacity: 0.6;
      `;
    }

    switch (variant) {
      case 'primary':
        return `
          background: ${theme.colors.primary};
          color: white;
          &:hover {
            background: ${theme.colors.primaryDark};
            transform: translateY(-1px);
          }
          &:active {
            transform: translateY(0);
          }
        `;
      case 'danger':
        return `
          background: ${theme.colors.error};
          color: white;
          &:hover {
            background: ${theme.colors.errorDark};
            transform: translateY(-1px);
          }
          &:active {
            transform: translateY(0);
          }
        `;
      default:
        return `
          background: transparent;
          color: ${theme.colors.text.secondary};
          &:hover {
            color: ${theme.colors.text.primary};
          }
        `;
    }
  }}
`;

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  children,
  onClick,
  type = 'button',
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      type={type}
      {...props}
    >
      {children}
    </StyledButton>
  );
}; 
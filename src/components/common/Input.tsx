import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'search';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  autoComplete?: string;
  pattern?: string;
  min?: string | number;
  max?: string | number;
  maxLength?: number;
  inputMode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';
}

const StyledInput = styled.input<{ size: 'sm' | 'md' | 'lg'; fullWidth: boolean }>`
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  padding: ${({ size }) => {
    switch (size) {
      case 'sm': return `${theme.spacing.xs} ${theme.spacing.sm}`;
      case 'lg': return `${theme.spacing.md} ${theme.spacing.lg}`;
      default: return `${theme.spacing.sm} ${theme.spacing.md}`;
    }
  }};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${({ size }) => {
    switch (size) {
      case 'sm': return '0.9rem';
      case 'lg': return '1.1rem';
      default: return '1rem';
    }
  }};
  outline: none;
  transition: border-color ${theme.transitions.default};
  box-sizing: border-box;
  font-family: inherit;

  &::placeholder {
    color: ${theme.colors.text.secondary};
  }

  &:hover {
    border-color: ${theme.colors.text.secondary};
  }

  &:focus {
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 2px ${theme.colors.primary}20;
  }

  &:disabled {
    background: ${theme.colors.background.light};
    color: ${theme.colors.text.light};
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${theme.mediaQueries.mobile} {
    font-size: 1rem;
  }
`;

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  size = 'md',
  fullWidth = false,
  disabled = false,
  autoFocus = false,
  className,
  id,
  name,
  required = false,
  autoComplete,
  pattern,
  min,
  max,
  maxLength,
  inputMode,
  ...props
}) => {
  return (
    <StyledInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      autoFocus={autoFocus}
      className={className}
      id={id}
      name={name}
      required={required}
      autoComplete={autoComplete}
      pattern={pattern}
      min={min}
      max={max}
      maxLength={maxLength}
      inputMode={inputMode}
      {...props}
    />
  );
}; 
import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface TextAreaProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
  minHeight?: string;
  maxHeight?: string;
  rows?: number;
  cols?: number;
  maxLength?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

const StyledTextArea = styled.textarea<{ 
  size: 'sm' | 'md' | 'lg'; 
  fullWidth: boolean;
  minHeight?: string;
  maxHeight?: string;
  resize?: string;
}>`
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  padding: ${({ size }) => {
    switch (size) {
      case 'sm': return theme.spacing.sm;
      case 'lg': return theme.spacing.lg;
      default: return theme.spacing.md;
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
  line-height: 1.6;
  min-height: ${({ minHeight }) => minHeight || '100px'};
  max-height: ${({ maxHeight }) => maxHeight || 'none'};
  resize: ${({ resize }) => resize || 'vertical'};

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

export const TextArea: React.FC<TextAreaProps> = ({
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
  minHeight,
  maxHeight,
  rows,
  cols,
  maxLength,
  resize,
  ...props
}) => {
  return (
    <StyledTextArea
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
      minHeight={minHeight}
      maxHeight={maxHeight}
      rows={rows}
      cols={cols}
      maxLength={maxLength}
      resize={resize}
      {...props}
    />
  );
}; 
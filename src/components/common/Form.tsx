import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  className
}) => {
  return (
    <StyledForm onSubmit={onSubmit} className={className}>
      {children}
    </StyledForm>
  );
};

// FormGroup 컴포넌트
interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

const FormGroupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className
}) => {
  return (
    <FormGroupContainer className={className}>
      {children}
    </FormGroupContainer>
  );
};

// Label 컴포넌트
interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  className?: string;
}

const StyledLabel = styled.label<{ required?: boolean }>`
  font-weight: 600;
  color: ${theme.colors.text.primary};
  font-size: 0.9rem;
  
  ${({ required }) => required && `
    &::after {
      content: ' *';
      color: ${theme.colors.error};
    }
  `}
`;

export const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  required = false,
  className
}) => {
  return (
    <StyledLabel htmlFor={htmlFor} required={required} className={className}>
      {children}
    </StyledLabel>
  );
};

// ErrorMessage 컴포넌트
interface ErrorMessageProps {
  children: React.ReactNode;
  className?: string;
}

const StyledErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: 0.9rem;
  margin-top: ${theme.spacing.xs};
`;

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  children,
  className
}) => {
  return (
    <StyledErrorMessage className={className}>
      {children}
    </StyledErrorMessage>
  );
};

// ButtonGroup 컴포넌트
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

const ButtonGroupContainer = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
  
  ${theme.mediaQueries.mobile} {
    flex-direction: column;
  }
`;

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className
}) => {
  return (
    <ButtonGroupContainer className={className}>
      {children}
    </ButtonGroupContainer>
  );
}; 
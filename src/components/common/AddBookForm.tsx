import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Modal } from './Modal';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 600;
  color: ${theme.colors.text.primary};
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: ${theme.spacing.sm};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const TextArea = styled.textarea`
  padding: ${theme.spacing.sm};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
`;

const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  flex: 1;

  ${({ variant }) =>
    variant === 'primary'
      ? `
    background: ${theme.colors.primary};
    color: white;
    
    &:hover {
      background: ${theme.colors.primaryDark};
    }
    
    &:disabled {
      background: ${theme.colors.border};
      cursor: not-allowed;
    }
  `
      : `
    background: ${theme.colors.background.white};
    color: ${theme.colors.text.primary};
    border: 2px solid ${theme.colors.border};
    
    &:hover {
      border-color: ${theme.colors.text.secondary};
    }
  `}
`;

const ErrorMessage = styled.div`
  color: ${theme.colors.error};
  font-size: 0.9rem;
  margin-top: ${theme.spacing.xs};
`;

interface AddBookFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookData: {
    title: string;
    author: string;
    description: string;
  }) => void;
  isLoading?: boolean;
}

const AddBookForm: React.FC<AddBookFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = '책 제목을 입력해주세요.';
    }

    if (!formData.author.trim()) {
      newErrors.author = '저자를 입력해주세요.';
    }

    if (!formData.description.trim()) {
      newErrors.description = '책 설명을 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        title: formData.title.trim(),
        author: formData.author.trim(),
        description: formData.description.trim(),
      });
    }
  };

  const handleClose = () => {
    setFormData({ title: '', author: '', description: '' });
    setErrors({});
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="새 책 추가하기">
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">책 제목 *</Label>
          <Input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="책 제목을 입력하세요"
            disabled={isLoading}
          />
          {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="author">저자 *</Label>
          <Input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="저자명을 입력하세요"
            disabled={isLoading}
          />
          {errors.author && <ErrorMessage>{errors.author}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">책 설명 *</Label>
          <TextArea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="책에 대한 간단한 설명을 입력하세요"
            disabled={isLoading}
          />
          {errors.description && <ErrorMessage>{errors.description}</ErrorMessage>}
        </FormGroup>

        <ButtonGroup>
          <Button type="button" onClick={handleClose} disabled={isLoading}>
            취소
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? '추가 중...' : '책 추가하기'}
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default AddBookForm; 
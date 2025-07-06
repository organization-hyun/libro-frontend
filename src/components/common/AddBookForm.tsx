import React, { useState } from 'react';
import { Modal } from './Modal';
import { Input, TextArea, Button, Form, FormGroup, Label, ErrorMessage, ButtonGroup } from './index';













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
          <Label htmlFor="title" required>책 제목</Label>
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
          <Label htmlFor="author" required>저자</Label>
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
          <Label htmlFor="description" required>책 설명</Label>
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
          <Button type="button" onClick={handleClose} disabled={isLoading} fullWidth>
            취소
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading} fullWidth>
            {isLoading ? '추가 중...' : '책 추가하기'}
          </Button>
        </ButtonGroup>
      </Form>
    </Modal>
  );
};

export default AddBookForm; 
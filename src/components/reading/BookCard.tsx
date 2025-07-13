import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Card = styled.div`
  background: ${theme.colors.background.white};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  min-height: 200px;
  position: relative;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.md};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: ${theme.spacing.sm};
  right: ${theme.spacing.sm};
  background: #8c8c8c;
  color: white;
  border: none;
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${Card}:hover & {
    opacity: 1;
    transform: scale(1.1);
  }

  &:hover {
    background: #666666;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.xs};
  font-weight: 600;
`;

const Author = styled.p`
  font-size: 1rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.sm};
`;

interface BookCardProps {
  id: number;
  title: string;
  author: string;
  onClick: () => void;
  onDelete?: (event: React.MouseEvent) => void;
  showDeleteButton?: boolean;
}

const BookCard: React.FC<BookCardProps> = React.memo(({
  title,
  author,
  onClick,
  onDelete,
  showDeleteButton = false
}) => {
  const handleDelete = (event: React.MouseEvent) => {
    event.stopPropagation();
    onDelete?.(event);
  };

  return (
    <Card onClick={onClick}>
      {showDeleteButton && (
        <DeleteButton onClick={handleDelete}>
          ×
        </DeleteButton>
      )}
      <Title>{title}</Title>
      <Author>{author}</Author>
    </Card>
  );
});

BookCard.displayName = 'BookCard';

export default BookCard; 
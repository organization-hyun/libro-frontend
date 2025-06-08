import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const DetailContainer = styled.div`
  padding: ${theme.spacing.lg};
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: ${theme.spacing.xl};
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: 0;
  margin-bottom: ${theme.spacing.md};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const BookInfo = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} 0;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${theme.colors.primary};
    border-radius: 2px;
  }
`;

const BookTitle = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  font-weight: 700;
  line-height: 1.2;
`;

const BookAuthor = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.secondary};
  font-weight: 500;
  margin-bottom: ${theme.spacing.lg};
`;

const BookDescription = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
`;

const ReadingGroupDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DetailContainer>
      <Header>
        <BackButton onClick={() => navigate('/reading-group')}>
          ← 돌아가기
        </BackButton>
        <BookInfo>
          <BookTitle>해변의 카프카</BookTitle>
          <BookAuthor>무라카미 하루키</BookAuthor>
          <BookDescription>
            15세 소년 '카프카 타무라'가 어머니와 누나를 찾아 집을 떠나면서 시작되는 
            미스터리한 이야기. 평행하게 전개되는 '나카타 씨'의 이야기와 함께, 
            현실과 비현실을 넘나드는 무라카미 하루키의 대표작입니다.
          </BookDescription>
        </BookInfo>
      </Header>
    </DetailContainer>
  );
};

export default ReadingGroupDetail; 
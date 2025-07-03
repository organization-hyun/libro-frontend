import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import ReadingTimer from '../components/reading/ReadingTimer';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.main};
  padding: ${theme.spacing.lg};
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.lg};
`;

const CompletionModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: ${theme.colors.background.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing.xl};
  text-align: center;
  max-width: 400px;
  width: 90%;
  box-shadow: ${theme.shadows.lg};
`;

const ModalTitle = styled.h2`
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const ModalMessage = styled.p`
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.lg};
  line-height: 1.6;
`;

const ModalButton = styled.button`
  padding: ${theme.spacing.md} ${theme.spacing.lg};
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};

  &:hover {
    background: ${theme.colors.primaryDark};
    transform: translateY(-2px);
  }
`;

const ReadingTimerPage: React.FC = () => {
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const handleTimerComplete = () => {
    setShowCompletionModal(true);
  };

  const handleCloseModal = () => {
    setShowCompletionModal(false);
  };

  return (
    <PageContainer>
      <Header>
        <Title>독서 타이머</Title>
        <Subtitle>
          매일 꾸준한 독서 습관을 만들어보세요
        </Subtitle>
      </Header>

      <ReadingTimer onComplete={handleTimerComplete} />

      {showCompletionModal && (
        <CompletionModal>
          <ModalContent>
            <ModalTitle>🎉 독서 완료!</ModalTitle>
            <ModalMessage>
              오늘의 독서 시간을 완료하셨습니다.<br />
              꾸준한 독서 습관이 당신을 성장시킬 것입니다.
            </ModalMessage>
            <ModalButton onClick={handleCloseModal}>
              확인
            </ModalButton>
          </ModalContent>
        </CompletionModal>
      )}
    </PageContainer>
  );
};

export default ReadingTimerPage; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 80px);
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  background: ${theme.colors.background.main};
  margin-top: -60px;
  position: relative;
  z-index: 1;

  ${theme.mediaQueries.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
    margin-top: -40px;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SearchTitle = styled.h1`
  font-size: 3.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  font-weight: 700;

  ${theme.mediaQueries.mobile} {
    font-size: 2.5rem;
  }
`;

const SearchSubtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl};
  line-height: 1.6;

  ${theme.mediaQueries.mobile} {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const SearchBox = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto ${theme.spacing.xl};
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.lg};
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  font-size: 1.1rem;
  outline: none;
  transition: border-color ${theme.transitions.default};

  &:focus {
    border-color: ${theme.colors.primary};
  }

  ${theme.mediaQueries.mobile} {
    padding: ${theme.spacing.md};
    font-size: 1rem;
    padding-right: 60px;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: ${theme.spacing.sm};
  top: 50%;
  transform: translateY(-50%);
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xs} 1rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-width: 40px;
  height: 70%;

  &:hover {
    background: ${theme.colors.primaryDark};
  }

  ${theme.mediaQueries.mobile} {
    font-size: 0.9rem;
    min-width: 40px;
    padding: ${theme.spacing.xs} 0.7rem;
    height: 70%;
  }
`;

const TimerButton = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.xl} ${theme.spacing.xl};
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.lg};
  font-size: 1.3rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-top: ${theme.spacing.xl};
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.3);
  position: relative;
  overflow: hidden;
  min-width: 280px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.6s;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 35px rgba(0, 123, 255, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-2px) scale(1.01);
    transition: all 0.1s;
  }

  ${theme.mediaQueries.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.lg};
    font-size: 1.1rem;
    min-width: 240px;
    gap: ${theme.spacing.xs};
  }
`;

const TimerIcon = styled.span`
  font-size: 1.4rem;
  animation: pulse 2s infinite;
  
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  ${theme.mediaQueries.mobile} {
    font-size: 1.2rem;
  }
`;

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTimerClick = () => {
    navigate('/reading-timer');
  };

  return (
    <HomeContainer>
      <SearchContainer>
        <SearchTitle>LIBRO</SearchTitle>
        <SearchSubtitle>
          도서명이나 저자명을 검색하여 원하는 책을 찾아보세요
        </SearchSubtitle>
        
        <form onSubmit={handleSearch}>
          <SearchBox>
            <SearchInput
              type="text"
              placeholder="도서명 또는 저자명을 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <SearchButton type="submit">검색</SearchButton>
          </SearchBox>
        </form>
        
        <TimerButton onClick={handleTimerClick}>
          <TimerIcon>⏰</TimerIcon>
          오늘의 독서 시작하기
        </TimerButton>
      </SearchContainer>
    </HomeContainer>
  );
};

export default HomePage; 
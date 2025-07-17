import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Input } from '../common';
import { getReadingGroups, ReadingGroupItem } from '../../api/readingGroup';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: ${theme.colors.background.main};
  overflow-x: hidden;
`;

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
  position: relative;

  ${theme.mediaQueries.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
  }
`;

const HeroSection = styled(Section)`
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);
  color: white;
  text-align: center;
`;

const ContentSection = styled(Section)`
  background: ${theme.colors.background.main};
  flex-direction: column;
  align-items: stretch;
  padding-top: 80px;
  padding-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  color: ${theme.colors.text.primary};

  ${theme.mediaQueries.mobile} {
    font-size: 2rem;
  }
`;

const SearchContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const SearchTitle = styled.h1`
  font-size: 4rem;
  color: white;
  margin-bottom: ${theme.spacing.lg};
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${theme.mediaQueries.mobile} {
    font-size: 3rem;
  }
`;

const SearchSubtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: ${theme.spacing.xl};
  font-weight: 300;

  ${theme.mediaQueries.mobile} {
    font-size: 1.1rem;
  }
`;

const SearchBox = styled.div`
  position: relative;
  max-width: 600px;
  margin: 0 auto ${theme.spacing.xl};

  ${theme.mediaQueries.mobile} {
    max-width: 100%;
    margin: 0 auto ${theme.spacing.lg};
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
    padding: ${theme.spacing.xs} 0.7rem;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  ${theme.mediaQueries.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.lg};
  }
`;

const Card = styled.div`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 1px solid ${theme.colors.border};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureCard = styled(Card)`
  padding: ${theme.spacing.xl};
`;

const ReadingGroupCard = styled(Card)`
  padding: ${theme.spacing.lg};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: ${theme.spacing.md};
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.text.primary};
  text-align: center;
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
  text-align: center;
`;

const ReadingGroupsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;

const ReadingGroupsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};

  ${theme.mediaQueries.mobile} {
    grid-template-columns: 1fr;
  }
`;

const GroupBookTitle = styled.h4`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: ${theme.spacing.xs};
  color: ${theme.colors.text.primary};
`;

const GroupBookAuthor = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.sm};
`;

const GroupDescription = styled.p`
  font-size: 0.9rem;
  color: ${theme.colors.text.secondary};
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.text.secondary};
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.text.secondary};
`;

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [readingGroups, setReadingGroups] = useState<ReadingGroupItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReadingGroups = async () => {
      try {
        const groups = await getReadingGroups();
        setReadingGroups(groups);
      } catch (error) {
        console.error('Failed to fetch reading groups:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReadingGroups();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTimerClick = () => {
    navigate('/reading-timer');
  };

  const handleReadingGroupClick = (groupId: number) => {
    navigate(`/reading-group/${groupId}`);
  };

  const handleReadingGroupsClick = () => {
    navigate('/reading-group');
  };

  return (
    <HomeContainer>
      <HeroSection>
        <SearchContainer>
          <SearchTitle>LIBRO</SearchTitle>
          <SearchSubtitle>당신의 독서 여정을 더욱 풍부하게</SearchSubtitle>
          
          <form onSubmit={handleSearch}>
            <SearchBox>
              <Input
                type="text"
                placeholder="도서명 또는 저자명을 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                fullWidth
                size="lg"
              />
              <SearchButton type="submit">검색</SearchButton>
            </SearchBox>
          </form>
        </SearchContainer>
      </HeroSection>

      <ContentSection>
        <SectionTitle>독서를 더욱 즐겁게</SectionTitle>
        <FeatureGrid>
          <FeatureCard onClick={handleTimerClick}>
            <FeatureIcon>⏰</FeatureIcon>
            <FeatureTitle>독서 타이머</FeatureTitle>
            <FeatureDescription>
              집중력 있는 독서를 위한 타이머 기능으로 
              효율적인 독서 습관을 만들어보세요
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard onClick={handleReadingGroupsClick}>
            <FeatureIcon>👥</FeatureIcon>
            <FeatureTitle>함께 읽기</FeatureTitle>
            <FeatureDescription>
              다른 독서가들과 함께 책을 읽고 
              서로의 생각을 나누어보세요
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard onClick={() => navigate('/reading-record')}>
            <FeatureIcon>📝</FeatureIcon>
            <FeatureTitle>독서 기록</FeatureTitle>
            <FeatureDescription>
              읽은 책들의 기록을 남기고 
              나만의 독서 일기를 작성해보세요
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </ContentSection>

      <ContentSection>
        <SectionTitle>지금 함께 읽고 있어요</SectionTitle>
        <ReadingGroupsContainer>
          {loading ? (
            <LoadingSpinner>함께 읽기 그룹을 불러오는 중...</LoadingSpinner>
          ) : readingGroups.length > 0 ? (
            <ReadingGroupsGrid>
              {readingGroups.slice(0, 6).map((group) => (
                <ReadingGroupCard
                  key={group.id}
                  onClick={() => handleReadingGroupClick(group.id)}
                >
                  <GroupBookTitle>{group.bookTitle}</GroupBookTitle>
                  <GroupBookAuthor>{group.bookAuthor}</GroupBookAuthor>
                  <GroupDescription>{group.description}</GroupDescription>
                </ReadingGroupCard>
              ))}
            </ReadingGroupsGrid>
          ) : (
            <EmptyState>
              <p>아직 함께 읽기 그룹이 없어요.</p>
              <p>첫 번째 그룹을 만들어보세요!</p>
            </EmptyState>
          )}
        </ReadingGroupsContainer>
      </ContentSection>
    </HomeContainer>
  );
};

export default HomePage; 
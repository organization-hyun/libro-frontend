import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from './styles/theme';
import ReadingRecordPage from './pages/ReadingRecordPage';
import ReadingRecordDetail from './pages/ReadingRecordDetail';
import ReadingGroup from './pages/ReadingGroup';
import ReadingGroupDetail from './pages/ReadingGroupDetail';
import Login from './pages/Login';
import SearchPage from './pages/SearchPage';
import { useAuth } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import {logout} from "@api/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background.main};
`;

const Header = styled.header`
  background-color: ${theme.colors.background.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
  position: relative;
  z-index: 10;

  ${theme.mediaQueries.mobile} {
    padding: ${theme.spacing.sm};
  }
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${theme.colors.text.primary};
  text-decoration: none;

  ${theme.mediaQueries.mobile} {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};

  ${theme.mediaQueries.mobile} {
    gap: ${theme.spacing.md};
  }
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-weight: 500;
  transition: color ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.primary};
  }

  ${theme.mediaQueries.mobile} {
    font-size: 0.9rem;
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};

  ${theme.mediaQueries.mobile} {
    padding: ${theme.spacing.md};
  }
`;

const HomePage = styled.div`
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

const Title = styled.h1`
  font-size: 3rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};

  ${theme.mediaQueries.mobile} {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl};

  ${theme.mediaQueries.mobile} {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};

  ${theme.mediaQueries.mobile} {
    grid-template-columns: 1fr;
    gap: ${theme.spacing.md};
    margin-top: ${theme.spacing.lg};
  }
`;

const FeatureItem = styled.div`
  background: ${theme.colors.background.white};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
  transition: transform ${theme.transitions.default};

  &:hover {
    transform: translateY(-4px);
  }

  ${theme.mediaQueries.mobile} {
    padding: ${theme.spacing.md};
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};

  ${theme.mediaQueries.mobile} {
    font-size: 1.2rem;
  }
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;

  ${theme.mediaQueries.mobile} {
    font-size: 0.9rem;
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
  width: 100%;
  max-width: 100%;
  margin-bottom: ${theme.spacing.xl};
`;

const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.spacing.lg};
  font-size: 1.1rem;
  border: 2px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.lg};
  background: ${theme.colors.background.white};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px ${theme.colors.primary}20;
  }

  &::placeholder {
    color: ${theme.colors.text.light};
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

const TrendingSection = styled.div`
  margin-top: ${theme.spacing.xl};
  text-align: center;
  padding: 0 ${theme.spacing.lg};
`;

const TrendingTitle = styled.h3`
  font-size: 1.1rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.md};
  font-weight: 500;
`;

const TrendingBooks = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};

  ${theme.mediaQueries.mobile} {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: ${theme.spacing.sm};
  }
`;

const TrendingBook = styled.button`
  background: ${theme.colors.background.white};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-color: ${theme.colors.primary};
  }

  &:active {
    transform: translateY(0);
  }
`;

const BookTitle = styled.span`
  color: ${theme.colors.text.primary};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.4;
`;

const BookAuthor = styled.span`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const IntroductionPage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};

  ${theme.mediaQueries.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
  }
`;

function App() {
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleTrendingBookClick = (bookTitle: string) => {
    navigate(`/search?q=${encodeURIComponent(bookTitle)}`);
  };

  return (
    <AppContainer>
      <Header>
        <Nav>
          <Logo to="/">LIBRO</Logo>
          <NavLinks>
            <NavLink to="/introduction">소개</NavLink>
            <NavLink to="/reading-record">독서 기록</NavLink>
            <NavLink to="/reading-group">독서 모임</NavLink>
            {!isAuthenticated ? (
              <NavLink to="/login">로그인</NavLink>
            ) : (
              <NavLink to="#" onClick={logout}>로그아웃</NavLink>
            )}
          </NavLinks>
        </Nav>
      </Header>

      <MainContent>
        <Routes>
          <Route path="/" element={
            <HomePage>
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
                <TrendingSection>
                  <TrendingTitle>최근 자주 검색된 도서</TrendingTitle>
                  <TrendingBooks>
                    <TrendingBook onClick={() => handleTrendingBookClick("해변의 카프카")}>
                      <BookTitle>해변의 카프카</BookTitle>
                      <BookAuthor>무라카미 하루키</BookAuthor>
                    </TrendingBook>
                    <TrendingBook onClick={() => handleTrendingBookClick("어떻게 말해줘야 할까")}>
                      <BookTitle>어떻게 말해줘야 할까</BookTitle>
                      <BookAuthor>김영하</BookAuthor>
                    </TrendingBook>
                    <TrendingBook onClick={() => handleTrendingBookClick("완전한 행복")}>
                      <BookTitle>완전한 행복</BookTitle>
                      <BookAuthor>정유정</BookAuthor>
                    </TrendingBook>
                    <TrendingBook onClick={() => handleTrendingBookClick("달러구트 꿈 백화점")}>
                      <BookTitle>달러구트 꿈 백화점</BookTitle>
                      <BookAuthor>이미예</BookAuthor>
                    </TrendingBook>
                    <TrendingBook onClick={() => handleTrendingBookClick("불편한 편의점")}>
                      <BookTitle>불편한 편의점</BookTitle>
                      <BookAuthor>김호연</BookAuthor>
                    </TrendingBook>
                    <TrendingBook onClick={() => handleTrendingBookClick("아몬드")}>
                      <BookTitle>아몬드</BookTitle>
                      <BookAuthor>손원평</BookAuthor>
                    </TrendingBook>
                  </TrendingBooks>
                </TrendingSection>
              </SearchContainer>
            </HomePage>
          } />
          <Route path="/introduction" element={
            <IntroductionPage>
              <Title>Welcome to LIBRO</Title>
              <Subtitle>당신의 독서 여정을 기록하고, 함께 나누세요</Subtitle>
              <Features>
                <Link to="/reading-record" style={{ textDecoration: 'none' }}>
                  <FeatureItem>
                    <FeatureTitle>📝 독서 기록</FeatureTitle>
                    <FeatureDescription>
                      읽은 책과 독서 활동을 체계적으로 기록하고 관리하세요
                    </FeatureDescription>
                  </FeatureItem>
                </Link>
                <Link to="/reading-group" style={{ textDecoration: 'none' }}>
                  <FeatureItem>
                    <FeatureTitle>👥 독서 모임</FeatureTitle>
                    <FeatureDescription>
                      관심사가 비슷한 독자들과 함께 독서 모임을 만들어보세요
                    </FeatureDescription>
                  </FeatureItem>
                </Link>
              </Features>
            </IntroductionPage>
          } />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/reading-record" 
            element={
              <ProtectedRoute>
                <ReadingRecordPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reading-record/:id" 
            element={
              <ProtectedRoute>
                <ReadingRecordDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reading-group" 
            element={
              <ProtectedRoute>
                <ReadingGroup />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/reading-group/:id" 
            element={
              <ProtectedRoute>
                <ReadingGroupDetail />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainContent>
    </AppContainer>
  );
}

function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWithRouter;
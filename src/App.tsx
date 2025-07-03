import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from './styles/theme';
import ReadingRecordPage from './pages/ReadingRecordPage';
import ReadingRecordDetail from './pages/ReadingRecordDetail';
import ReadingGroup from './pages/ReadingGroup';
import ReadingGroupDetail from './pages/ReadingGroupDetail';
import Login from './pages/Login';
import SearchPage from './pages/SearchPage';
import BookDetail from './pages/BookDetail';
import ReadingTimerPage from './pages/ReadingTimerPage';
import { ProtectedRoute } from './components/ProtectedRoute';
import Header from './components/common/Header';
import HomePage from './components/home/HomePage';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background.main};
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};

  ${theme.mediaQueries.mobile} {
    padding: ${theme.spacing.md};
  }
`;

const IntroductionPage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};

  ${theme.mediaQueries.mobile} {
    padding: ${theme.spacing.lg} ${theme.spacing.sm};
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

function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/introduction" element={
            <IntroductionPage>
              <Title>Welcome to LIBRO</Title>
              <Subtitle>당신의 독서 여정을 기록하고, 함께 나누세요</Subtitle>
              <Features>
                <FeatureItem>
                  <FeatureTitle>📝 독서 기록</FeatureTitle>
                  <FeatureDescription>
                    읽은 책과 독서 활동을 체계적으로 기록하고 관리하세요
                  </FeatureDescription>
                </FeatureItem>
                <FeatureItem>
                  <FeatureTitle>👥 독서 모임</FeatureTitle>
                  <FeatureDescription>
                    관심사가 비슷한 독자들과 함께 독서 모임을 만들어보세요
                  </FeatureDescription>
                </FeatureItem>
              </Features>
            </IntroductionPage>
          } />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/book/:bookId" element={<BookDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reading-timer" element={<ReadingTimerPage />} />
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
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



function App() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<HomePage />} />

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
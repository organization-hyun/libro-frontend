import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from './styles/theme';
import ReadingRecord from './pages/ReadingRecord';
import ReadingRecordDetail from './pages/ReadingRecordDetail';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: ${theme.colors.background.main};
`;

const Header = styled.header`
  background-color: ${theme.colors.background.white};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  box-shadow: ${theme.shadows.sm};
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
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${theme.spacing.lg};
`;

const NavLink = styled(Link)`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-weight: 500;
  transition: color ${theme.transitions.default};

  &:hover {
    color: ${theme.colors.primary};
  }
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing.lg};
`;

const HomePage = styled.div`
  text-align: center;
  padding: ${theme.spacing.xl} ${theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: 3rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${theme.colors.text.secondary};
  margin-bottom: ${theme.spacing.xl};
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.xl};
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
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.text.secondary};
  line-height: 1.6;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Header>
          <Nav>
            <Logo to="/">LIBRO</Logo>
            <NavLinks>
              <NavLink to="/reading-record">독서 기록</NavLink>
              <NavLink to="/reading-group">독서 모임</NavLink>
            </NavLinks>
          </Nav>
        </Header>

        <MainContent>
          <Routes>
            <Route path="/" element={
              <HomePage>
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
              </HomePage>
            } />
            <Route path="/reading-record" element={<ReadingRecord />} />
            <Route path="/reading-record/:id" element={<ReadingRecordDetail />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </Router>
  );
}

export default App;

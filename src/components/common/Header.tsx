import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../api/auth';

const HeaderContainer = styled.header`
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

const LogoutButton = styled.button`
  color: ${theme.colors.text.secondary};
  text-decoration: none;
  font-weight: 500;
  transition: color ${theme.transitions.default};
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;

  &:hover {
    color: ${theme.colors.primary};
  }

  ${theme.mediaQueries.mobile} {
    font-size: 0.9rem;
  }
`;

const Header: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <HeaderContainer>
      <Nav>
        <Logo to="/">LIBRO</Logo>
        <NavLinks>
          <NavLink to="/introduction">소개</NavLink>
          <NavLink to="/reading-timer">독서 타이머</NavLink>
          <NavLink to="/reading-record">독서 기록</NavLink>
          <NavLink to="/reading-group">독서 모임</NavLink>
          {!isAuthenticated ? (
            <NavLink to="/login">로그인</NavLink>
          ) : (
            <LogoutButton onClick={logout}>로그아웃</LogoutButton>
          )}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header; 
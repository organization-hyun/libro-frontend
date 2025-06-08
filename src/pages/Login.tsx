import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  max-width: 1000px;
  margin: 60px auto;
  display: flex;
  background: ${theme.colors.background.main};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.md};
  overflow: hidden;

  ${theme.mediaQueries.mobile} {
    margin: 0;
    flex-direction: column;
    border-radius: 0;
    min-height: 100vh;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${theme.colors.background.light};

  ${theme.mediaQueries.mobile} {
    padding: 40px 20px;
    text-align: center;
  }
`;

const RightSection = styled.div`
  flex: 1;
  padding: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${theme.colors.background.white};

  ${theme.mediaQueries.mobile} {
    padding: 40px 20px;
  }
`;

const BookIcon = styled.div`
  font-size: 4rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xl};

  ${theme.mediaQueries.mobile} {
    font-size: 3rem;
    margin-bottom: ${theme.spacing.lg};
  }
`;

const WelcomeText = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  line-height: 1.3;
  font-weight: 700;

  ${theme.mediaQueries.mobile} {
    font-size: 2rem;
  }
`;

const SubText = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: ${theme.spacing.xl};

  ${theme.mediaQueries.mobile} {
    font-size: 1rem;
    margin-bottom: ${theme.spacing.lg};
    br {
      display: none;
    }
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  width: 100%;

  ${theme.mediaQueries.mobile} {
    gap: ${theme.spacing.md};
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  width: 100%;
  transition: all ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.text.light};
  }

  ${theme.mediaQueries.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const LoginButton = styled.button`
  width: 100%;
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transitions.default};
  margin-top: ${theme.spacing.sm};

  &:hover {
    background-color: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${theme.colors.disabled};
    cursor: not-allowed;
    transform: none;
  }

  ${theme.mediaQueries.mobile} {
    padding: ${theme.spacing.sm} ${theme.spacing.md};
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: ${theme.spacing.xl} 0;
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${theme.colors.border};
  }

  &::before {
    margin-right: ${theme.spacing.md};
  }

  &::after {
    margin-left: ${theme.spacing.md};
  }

  ${theme.mediaQueries.mobile} {
    margin: ${theme.spacing.lg} 0;
  }
`;

const GoogleButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${theme.spacing.md};
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.error};
  text-align: center;
  margin-top: ${theme.spacing.sm};
  font-size: 0.9rem;
`;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ email, password });
      navigate(from, { replace: true });
    } catch (err) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Google 로그인 버튼 초기화
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <LoginContainer>
      <LeftSection>
        <BookIcon>📚</BookIcon>
        <WelcomeText>독서의 새로운 시작<br />LIBRO</WelcomeText>
        <SubText>
          LIBRO와 함께 당신만의 독서 여정을 기록하고,<br />
          같은 관심사를 가진 독자들과 소통하세요.
        </SubText>
      </LeftSection>
      <RightSection>
        <LoginForm onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </InputGroup>
          <LoginButton type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중...' : '로그인'}
          </LoginButton>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </LoginForm>

        <Divider>또는</Divider>

        <GoogleButtonContainer>
          <div
            id="g_id_onload"
            data-client_id="YOUR_GOOGLE_CLIENT_ID"
            data-context="signin"
            data-ux_mode="popup"
            data-callback="handleCredentialResponse"
            data-auto_prompt="false"
          />
          <div
            className="g_id_signin"
            data-type="standard"
            data-shape="rectangular"
            data-theme="outline"
            data-text="signin_with"
            data-size="large"
            data-logo_alignment="left"
            data-width="100%"
          />
        </GoogleButtonContainer>
      </RightSection>
    </LoginContainer>
  );
};

export default Login; 
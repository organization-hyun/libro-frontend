import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const LoginContainer = styled.div`
  max-width: 900px;
  margin: 60px auto;
  padding: ${theme.spacing.xl};
  display: flex;
  gap: ${theme.spacing.xl};
  background: ${theme.colors.background.main};
`;

const LeftSection = styled.div`
  flex: 1;
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RightSection = styled.div`
  flex: 1;
  padding: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${theme.colors.background.white};
`;

const WelcomeText = styled.h1`
  font-size: 2.5rem;
  color: ${theme.colors.text.primary};
  margin-bottom: ${theme.spacing.md};
  line-height: 1.2;
`;

const SubText = styled.p`
  color: ${theme.colors.text.secondary};
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: ${theme.spacing.xl};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const Label = styled.label`
  color: ${theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: 1rem;
  transition: border-color ${theme.transitions.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
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
  cursor: pointer;
  transition: all ${theme.transitions.default};
  margin-top: ${theme.spacing.md};

  &:hover {
    background-color: ${theme.colors.primaryDark};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: ${theme.spacing.lg} 0;
  color: ${theme.colors.text.secondary};

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
`;

const GoogleButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const BookIcon = styled.div`
  font-size: 4rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
`;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login();
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
  };

  return (
    <LoginContainer>
      <LeftSection>
        <BookIcon>📚</BookIcon>
        <WelcomeText>독서의 새로운 시작 LIBRO</WelcomeText>
        <SubText>
          LIBRO와 함께 당신만의 독서 여정을 기록하고, 
          같은 관심사를 가진 독자들과 소통하세요.
        </SubText>
      </LeftSection>
      <RightSection>
        <LoginForm onSubmit={handleLogin}>
          <InputGroup>
            <Label htmlFor="email">이메일</Label>
            <Input 
              id="email"
              type="email" 
              placeholder="your@email.com"
              required 
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input 
              id="password"
              type="password" 
              placeholder="••••••••"
              required 
            />
          </InputGroup>
          <LoginButton type="submit">
            로그인
          </LoginButton>
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
} 
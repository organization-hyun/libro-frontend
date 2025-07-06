import { theme } from './theme';

// 공통 애니메이션
export const animations = {
  fadeIn: `
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `,
  fadeInUp: `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
  slideIn: `
    @keyframes slideIn {
      from {
        transform: translateY(-20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `,
  pulse: `
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
  `
};

// 공통 레이아웃 스타일
export const layoutStyles = {
  container: `
    max-width: 1200px;
    margin: 0 auto;
    padding: ${theme.spacing.lg};

    ${theme.mediaQueries.mobile} {
      padding: ${theme.spacing.md};
    }
  `,
  flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  flexBetween: `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  grid: `
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${theme.spacing.lg};
  `
};

// 공통 텍스트 스타일
export const textStyles = {
  title: `
    font-size: 2rem;
    color: ${theme.colors.text.primary};
    font-weight: 700;
    margin-bottom: ${theme.spacing.md};
  `,
  subtitle: `
    font-size: 1.2rem;
    color: ${theme.colors.text.secondary};
    margin-bottom: ${theme.spacing.lg};
  `,
  sectionTitle: `
    font-size: 1.5rem;
    color: ${theme.colors.text.primary};
    font-weight: 600;
    margin-bottom: ${theme.spacing.md};
    padding-bottom: ${theme.spacing.sm};
    border-bottom: 2px solid ${theme.colors.border};
  `
};

// 공통 상태 스타일
export const stateStyles = {
  loading: `
    text-align: center;
    padding: ${theme.spacing.xl} 0;
    color: ${theme.colors.text.secondary};
  `,
  error: `
    text-align: center;
    padding: ${theme.spacing.xl} 0;
    color: ${theme.colors.error};
  `,
  empty: `
    text-align: center;
    padding: ${theme.spacing.xl} 0;
    color: ${theme.colors.text.secondary};
    font-size: 1.1rem;
  `
};

// 공통 인터랙션 스타일
export const interactionStyles = {
  hoverable: `
    transition: all ${theme.transitions.default};
    cursor: pointer;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${theme.shadows.md};
    }
  `,
  clickable: `
    transition: all ${theme.transitions.default};
    cursor: pointer;

    &:hover {
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  `
}; 
/** @jsxImportSource @emotion/react */
import toast, { Toaster } from 'react-hot-toast';
import { theme } from '../../styles/theme';

// 토스트 메시지 표시 함수들
export const showToast = {
  success: (message: string) => {
    toast.success(message, {
      duration: 2000,
      style: {
        background: theme.colors.white,
        color: theme.colors.text.primary,
        border: `1px solid ${theme.colors.primary}`,
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 16px',
      },
      iconTheme: {
        primary: theme.colors.primary,
        secondary: theme.colors.white,
      },
    });
  },

  error: (message: string) => {
    toast.error(message, {
      duration: 2000,
      style: {
        background: theme.colors.white,
        color: theme.colors.text.primary,
        border: `1px solid ${theme.colors.red}`,
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '500',
        padding: '12px 16px',
      },
      iconTheme: {
        primary: theme.colors.red,
        secondary: theme.colors.white,
      },
    });
  },
};

// Toaster 컴포넌트
export const ToastContainer = () => {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 2000,
        style: {
          background: theme.colors.white,
          color: theme.colors.text.primary,
          border: `1px solid ${theme.colors.gray}`,
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          padding: '12px 16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        },
      }}
    />
  );
};

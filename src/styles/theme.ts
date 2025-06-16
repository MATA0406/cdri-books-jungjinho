export const theme = {
  colors: {
    primary: '#4880EE',
    red: '#E84118',
    white: '#FFFFFF',
    black: '#222222',
    gray: '#DADADA',
    lightGray: '#F2F4F6',

    text: {
      primary: '#353C49',
      secondary: '#6D7582',
      subtitle: '#8D94A0',
    },

    background: '#FFFFFF',
    surface: '#F2F4F6',
    border: '#DADADA',

    success: '#4caf50',
    warning: '#ff9800',
    error: '#E84118',
    info: '#4880EE',
  },

  typography: {
    fontFamily:
      "'Noto Sans KR', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",

    title1: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: '1em',
    },
    title2: {
      fontSize: '22px',
      fontWeight: 700,
      lineHeight: '1.09em',
    },
    title3: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '1em',
    },
    body1: {
      fontSize: '20px',
      fontWeight: 500,
      lineHeight: '1em',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 500,
      lineHeight: '1em',
    },
    body2Bold: {
      fontSize: '14px',
      fontWeight: 700,
      lineHeight: '1em',
    },
    caption: {
      fontSize: '16px',
      fontWeight: 500,
      lineHeight: '1em',
    },
    small: {
      fontSize: '10px',
      fontWeight: 500,
      lineHeight: '1em',
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
    round: '50%',
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },

  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1200px',
  },

  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
  },

  transitions: {
    fast: '150ms ease-in-out',
    normal: '300ms ease-in-out',
    slow: '500ms ease-in-out',
  },
} as const;

export type Theme = typeof theme;

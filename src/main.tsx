// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Global } from '@emotion/react';
import { globalStyle } from './styles/global';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyle} />
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
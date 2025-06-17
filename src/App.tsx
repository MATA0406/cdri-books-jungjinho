/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { globalStyle } from './styles/global';
import { BookSearchPage } from './pages/BookSearchPage';
import { ToastContainer } from './components/common';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Global styles={globalStyle} />
      <BookSearchPage />
      <ToastContainer />
    </QueryClientProvider>
  );
}

export default App;

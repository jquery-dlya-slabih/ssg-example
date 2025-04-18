import { QueryClientProvider, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';
import { createBrowserRouter } from 'react-router';

import createRoutes from '@/createRoutes.tsx';

import '@/index.css';

declare global {
  interface Window {
    __REACT_QUERY_STATE__: string;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
});

const routes = createRoutes(queryClient);
const router = createBrowserRouter(routes);
const dehydratedState = window.__REACT_QUERY_STATE__;
const container = document.getElementById('root');

if (container) {
  const app = (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </HydrationBoundary>
      </QueryClientProvider>
    </StrictMode>
  );

  if (container.children.length) {
    hydrateRoot(container, app);
  } else {
    const root = createRoot(container);
    root.render(app);
  }
} else {
  throw new Error('Container not found, must be HTMLElement');
}

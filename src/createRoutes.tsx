import type { RouteObject } from 'react-router';
import type { QueryClient } from '@tanstack/react-query';
import { lazy } from 'react';

import Layout from '@/components/layout';
import { productsQuery, productQuery } from '@/queries.ts';

const createRoutes = (queryClient: QueryClient): RouteObject[] => {
  return [
    {
      path: '/',
      Component: Layout,
      children: [
        {
          index: true,
          Component: lazy(() => import('@/pages/main')),
          loader: async () => {
            if (import.meta.env.SSR) {
              await queryClient.prefetchQuery(productsQuery());
            }
          }
        },
        {
          path: '/products/:id',
          Component: lazy(() => import('@/pages/product')),
          loader: async ({ params }) => {
            if (import.meta.env.SSR) {
              await queryClient.prefetchQuery(productQuery(params.id));
            }
          }
        }
      ]
    }
  ];
};

export default createRoutes;

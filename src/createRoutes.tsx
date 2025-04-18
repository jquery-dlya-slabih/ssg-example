import type { RouteObject } from 'react-router';
import type { QueryClient } from '@tanstack/react-query';

import Layout from '@/components/layout';
import MainPage from '@/pages/main';
import ProductPage from '@/pages/product';
import { productsQuery, productQuery } from '@/queries.ts';

const createRoutes = (queryClient: QueryClient): RouteObject[] => {
  return [
    {
      path: '/',
      Component: Layout,
      children: [
        {
          index: true,
          Component: MainPage,
          loader: async () => {
            if (import.meta.env.SSR) {
              await queryClient.prefetchQuery(productsQuery());
            }
          }
        },
        {
          path: '/products/:id',
          Component: ProductPage,
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

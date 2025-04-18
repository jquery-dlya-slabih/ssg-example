import { queryOptions, skipToken } from '@tanstack/react-query';

import { getProduct, getTopProducts } from '@/api.ts';

export const productsQuery = () =>
  queryOptions({
    queryKey: ['products'],
    queryFn: getTopProducts
  });

export const productQuery = (id?: string) =>
  queryOptions({
    queryKey: ['product', id],
    queryFn: id ? () => getProduct(id) : skipToken
  });

import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router';

import { productsQuery } from '@/queries.ts';

function MainPage() {
  const { data, isPending, isError } = useQuery(productsQuery());

  if (isPending) {
    return <div className="animate-pulse p-50 font-bold text-pink-500">Loading...</div>;
  }

  if (isError) {
    return <div className="p-50 font-bold text-red-400">Something went wrong...</div>;
  }

  return (
    <>
      <title>Top products</title>
      <meta name="description" content={`Count of top products ${data.length}`} />
      <div className="px-20">
        {data?.map(({ title, brand, price, id }) => (
          <NavLink key={id} to={`/products/${id}`} className="cursor-pointer block hover:opacity-70">
            <span>{title}</span>
            <span className="ml-14">{brand}</span>
            <span className="ml-14">{price}</span>
          </NavLink>
        ))}
      </div>
    </>
  );
}

export default MainPage;

import { useQuery } from '@tanstack/react-query';
import { NavLink, useParams } from 'react-router';
import { productQuery } from '@/queries.ts';

function ProductPage() {
  const { id } = useParams();
  const { data, isPending, isError } = useQuery(productQuery(id));

  if (isPending) {
    return <div className="animate-pulse p-50 font-bold text-pink-500">Loading...</div>;
  }

  if (isError) {
    return <div className="p-50 font-bold text-red-400">Something went wrong...</div>;
  }

  const { title, brand, rating, price, description } = data;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={`Look ${title} ${brand} for ${price}`} />
      <div className="p-20">
        <h1 className="text-[22px] uppercase">{title}</h1>
        <div>Brand: {brand}</div>
        <div>Description: {description}</div>
        <div>Price: {price}</div>
        <div>Rating: {rating}</div>
      </div>
      <NavLink className="p-10 mx-20 mt-14 border text-purple-500 border-purple-500 rounded-md hover:shadow-md" to="/">
        Go to main page
      </NavLink>
    </>
  );
}

export default ProductPage;

export const getTopProducts = async (): Promise<IProduct[]> => {
  const res = await fetch('https://dummyjson.com/products?limit=5');
  const data = await res.json();

  return data.products;
};

export const getProduct = async (id: string): Promise<IProduct> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  return await res.json();
};

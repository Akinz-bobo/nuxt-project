import { products } from "~/data/products";
import { defineEventHandler, getQuery } from "h3";

export default defineEventHandler((event) => {
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 10;
  const category = query.category as string | undefined;

  let filteredProducts = products;

  // Filter by category if provided
  if (category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category
    );
  }

  const total = filteredProducts.length;
  const start = (page - 1) * limit;
  const end = start + limit;

  if (start >= total) {
    return { statusCode: 404, message: "Page not found" };
  }

  return {
    data: filteredProducts.slice(start, end),
    meta: {
      total,
      page,
      limit,
    },
  };
});

import { defineEventHandler, getQuery } from "h3";
import { faker } from "@faker-js/faker";
import type { Category, Product } from "~/types";

const categories: Category[] = [
  "Electronics",
  "Books",
  "Clothing",
  "Home & Kitchen",
  "Toys & Games",
];

export default defineEventHandler((event) => {
  const q = getQuery(event);
  const count = Number(q.count || 10);
  let products: Product[] = [];
  for (let i = 0; i < count; i++) {
    products.push({
      id: i + 1,
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseFloat(faker.commerce.price()),
      image: faker.image.url(),
      category: categories[i % categories.length],
    });
  }

  return {
    status: 200,
    body: products,
  };
});

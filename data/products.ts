import { faker } from "@faker-js/faker";
import type { Category, Product } from "~/types";

export const products: Product[] = [];

const categories: Category[] = [
  "Electronics",
  "Books",
  "Clothing",
  "Home & Kitchen",
  "Toys & Games",
];

for (let i = 0; i < 200; i++) {
  products.push({
    id: i + 1,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    image: faker.image.url(),
    category: categories[i % categories.length],
  });
}

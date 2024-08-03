import { defineEventHandler, readBody } from "h3";
import { products } from "~/data/products";
import { Product } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody<Product>(event);
    if (!body.name || !body.description || !body.price || !body.category) {
      throw new Error("Missing required fields");
    }

    if (
      ![
        "Electronics",
        "Books",
        "Clothing",
        "Home & Kitchen",
        "Toys & Games",
      ].includes(body.category)
    ) {
      throw new Error("Invalid category");
    }

    const newProduct: Product = {
      ...body,
      id: products.length ? products[products.length - 1].id + 1 : 1,
    };

    products.push(newProduct);
    return newProduct;
  } catch (error) {
    return { statusCode: 400, message: (error as Error).message };
  }
});

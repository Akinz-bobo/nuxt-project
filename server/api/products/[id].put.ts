import { defineEventHandler, readBody } from "h3";
import { products } from "~/data/products";
import { Product } from "~/types";

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params || {};
    if (!id) {
      return { statusCode: 400, message: "Product ID is required" };
    }

    const productId = parseInt(id);
    if (isNaN(productId)) {
      return { statusCode: 400, message: "Invalid Product ID" };
    }

    const body = await readBody<Partial<Product>>(event);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return { statusCode: 404, message: "Product not found" };
    }

    if (
      body.category &&
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

    products[productIndex] = { ...products[productIndex], ...body };
    return products[productIndex];
  } catch (error) {
    return { statusCode: 400, message: (error as Error).message };
  }
});

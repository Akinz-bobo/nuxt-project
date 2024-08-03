import { defineEventHandler } from "h3";
import { products } from "~/data/products";

export default defineEventHandler((event) => {
  try {
    const { id } = event.context.params || {};
    if (!id) {
      return { statusCode: 400, message: "Product ID is required" };
    }

    const productId = parseInt(id);
    if (isNaN(productId)) {
      return { statusCode: 400, message: "Invalid Product ID" };
    }

    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return { statusCode: 404, message: "Product not found" };
    }

    const deletedProduct = products.splice(productIndex, 1);
    return {
      statusCode: 200,
      message: "Product deleted",
      product: deletedProduct[0],
    };
  } catch (error) {
    return {
      statusCode: 500,
      message: "An error occurred while deleting the product",
    };
  }
});

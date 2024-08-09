import type { Product } from "~/types";
export const useProductsStore = defineStore("products", () => {
  const products = ref<Product[]>([]);

  const fetchProducts = (count?: number) => {
    $fetch(`/api/products?count=${count}`).then((response) => {
      products.value = response.body;
    });
  };
  fetchProducts(100);

  const deleteProduct = (id: number) => {
    products.value = products.value.filter((product) => product.id !== id);
  };

  return {
    products,
    fetchProducts,
    deleteProduct,
  };
});

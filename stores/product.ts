import type { Product } from "~/types";
import { products as productData } from "~/data/products";
export const useProductsStore = defineStore("produc", () => {
  const products = ref<Product[]>([]);
  const product = ref<Product>();

  const setProduts = (data?: any) => (products.value = data);
  const setProduct = (data?: any) => (product.value = data);
  const fetchProducts = async () => {
    try {
      return setProduts(productData);
    } catch (error) {
      setProduts();
      console.log(error);
    }
  };

  const fetchProduct = async (id: number) => {
    try {
      const product: Product | undefined = productData.find(
        (product) => product.id === id
      );
      setProduct(product);
    } catch (error) {
      setProduct();
      console.log(error);
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      productData.filter((item) => item.id === id);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return {
    products,
    product,
    fetchProducts,
    fetchProduct,
    deleteProduct,
  };
});

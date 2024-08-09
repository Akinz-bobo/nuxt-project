import type { User } from "~/types";

export const useUserStore = defineStore("user", () => {
  const customers = ref<User[]>([]);
  const customer = ref<User | null>(null);
  const fetchCustomers = (count?: number) => {
    $fetch(`/api/customers?count=${count}`).then((response) => {
      customers.value = response.body;
    });
  };

  fetchCustomers(100);

  const deleteCustomer = (id: string) => {
    customers.value = customers.value.filter((customer) => customer.id !== id);
  };

  const setCustomer = (userData: User) => {
    customer.value = userData;
  };
  return {
    customers,
    customer,
    setCustomer,
    fetchCustomers,
    deleteCustomer,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

import type { User } from "~/types";

export const useUserStore = defineStore("user", () => {
  const customers = ref<User[]>([]);

  const fetchCustomers = (count?: number) => {
    $fetch(`/api/customers?count=${count}`).then((response) => {
      customers.value = response.body;
    });
  };

  fetchCustomers(100);

  const deleteCustomer = (id: string) => {
    customers.value = customers.value.filter((customer) => customer.id !== id);
  };

  const verifyCustomer = (id: string) => {
    const customer = customers.value.find((customer) => customer.id === id);
    if (!customer) {
      throw new Error("Customer not found");
    }
    return customer;
  };

  const updateCustomer = (
    id: string,
    formValues: {
      fullname: string;
      email: string;
      age: number;
    }
  ) => {
    const customerIndex = customers.value.findIndex(
      (customer) => customer.id === id
    );
    if (customerIndex === -1) {
      throw new Error("Customer not found");
    }

    customers.value[customerIndex] = {
      ...customers.value[customerIndex],
      name: formValues.fullname,
      email: formValues.email,
      age: formValues.age,
    };

    return customers.value;
  };

  return {
    customers,
    fetchCustomers,
    deleteCustomer,
    verifyCustomer,
    updateCustomer,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}

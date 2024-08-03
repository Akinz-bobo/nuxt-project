import type { Customer, User } from "~/types";

export const useUserStore = defineStore("user", () => {
  const user = ref();
  const customers = ref<any[]>([]);
  const token = useCookie("MyCookie", {
    maxAge: 60 * 60,
  });
  const setToken = (data?: string) => (token.value = data);
  const setCustomers = (data?: any) => (customers.value = data);
  const setUser = (data?: any) => (user.value = data);
  const signIn = async (data: { username: string; password: string }) => {
    try {
      const response = await $fetch<User>(`https://dummyjson.com/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify({
          ...data,
          expiresInMins: 30,
        }),
      });
      setToken(response.token);
      await fetchCustomer(1);
      return;
    } catch (error) {
      setToken();
      setUser();
      console.log(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await $fetch<{ users: any[] }>(
        `https://dummyjson.com/users`
      );
      console.log(1);
      console.log(response.users);

      const data: Customer[] = response.users.map((item) => ({
        id: item.id,
        firstName: item.firstName,
        lastName: item.lastName,
        age: item.age,
        gender: item.gender,
        email: item.email,
        phone: item.phone,
        image: item.image,
      }));

      console.log(data);
      return setCustomers(data);
    } catch (error) {
      setCustomers();
      console.log(error);
    }
  };

  const fetchCustomer = async (id: number) => {
    if (token.value) {
      try {
        const response = await $fetch<any>(
          `https://dummyjson.com/users/${id}`,
          {
            headers: { Authorization: `Bearer ${token.value}` },
          }
        );

        const data: Customer = {
          id: response.id,
          firstName: response.firstName,
          lastName: response.lastName,
          age: response.age,
          gender: response.gender,
          email: response.email,
          phone: response.phone,
          image: response.image,
        };
        return setUser(data);
      } catch (error) {
        setUser();
        console.log(error);
      }
    }
  };

  const updateCustomer = async (id: number, data: Customer) => {
    if (token.value) {
      try {
        const response = await $fetch(`https://dummyjson.com/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
          body: JSON.stringify(data),
        });
        return setUser(response);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const deleteCustomer = async (id: number) => {
    if (token.value) {
      try {
        await $fetch(`https://dummyjson.com/users/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token.value}` },
        });
        fetchCustomers();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const logout = () => {
    setToken();
    setUser();
  };

  return {
    user,
    customers,
    token,
    setCustomers,
    signIn,
    fetchCustomers,
    fetchCustomer,
    updateCustomer,
    deleteCustomer,
    logout,
  };
});

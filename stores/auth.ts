export const useAuthStore = defineStore("auth", () => {
  type User = {
    id: number;
    username: string;
    password: string;
    email: string;
  };

  const user = ref<User>();
  const token = ref<string>();

  const login = (data: { username: string; password: string }) => {
    const reponse = $fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.token) {
        localStorage.setItem("token", response.token);
        token.value = response.token;
        $fetch("/api/auth/user", {
          headers: {
            Authorization: `Bearer ${response.token}`,
          },
        }).then((response) => {
          if (response.user) {
            user.value = response?.user;
            return { message: "Logged in successfully!" };
          } else {
            user.value = undefined;
            throw new Error("Failed to log use in");
          }
        });
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    user.value = undefined;
  };

  return {
    token,
    user,
    login,
    logout,
  };
});

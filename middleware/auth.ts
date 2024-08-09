export default defineNuxtRouteMiddleware(async (to, from) => {
  const { token } = storeToRefs(useAuthStore());
  if (!token) {
    return await navigateTo("/auth/login");
  }
});

export default defineNuxtRouteMiddleware(async (to, from) => {
  const userStore = useUserStore();
  console.log(userStore.user);
  if (!!userStore.user) {
    return await navigateTo("/");
  }
});

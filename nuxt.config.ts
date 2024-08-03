export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "nuxt-icon",
    "nuxt-lucide-icons",
    "nuxt-highcharts",
    "@pinia/nuxt",
    // "@nuxtjs/axios",
    // "@nuxtjs/auth-next",
  ],

  lucide: {
    namePrefix: "Icon",
  },
  pinia: {
    autoImports: ["defineStore"],
  },
  dirs: ["./stores"],
  router: {},
  // axios: {
  //   baseURL: "http://localhost:3000/api",
  // },
  // auth: {
  //   strategies: {
  //     local: {
  //       token: {
  //         property: "token",
  //         global: true,
  //         required: true,
  //         type: "Bearer",
  //       },
  //       user: {
  //         property: "user",
  //         autoFetch: true,
  //       },
  //       endpoints: {
  //         login: { url: "/auth/login", method: "post" },
  //         logout: { url: "/auth/logout", method: "post" },
  //         user: { url: "/auth/user", method: "get" },
  //       },
  //     },
  //     session: {
  //       user: {
  //         property: "user",
  //         autoFetch: true,
  //       },
  //       endpoints: {
  //         login: { url: "/auth/login", method: "post", withCredentials: true },
  //         logout: {
  //           url: "/auth/logout",
  //           method: "post",
  //           withCredentials: true,
  //         },
  //         user: { url: "/auth/user", method: "get", withCredentials: true },
  //       },
  //     },
  //   },
  // },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
});

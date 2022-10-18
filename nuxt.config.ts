// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', href: '/favicon.svg' },
      ]
    }
  },
  css: ['@/assets/styles/main.scss'],
  // vite: {
  //   css: {
  //     preprocessorOptions: {
  //       sass: {
  //         additionalData: '@import "@/assets/styles/_variables.sass"',
  //       },
  //     },
  //   },
  // },
  typescript: {
    shim: false
  }
})

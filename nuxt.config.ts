// https://v3.nuxtjs.org/api/configuration/nuxt.config
import {resolve} from 'path';

const SRC = resolve(__dirname, 'src');

export default defineNuxtConfig({
  rootDir: SRC,
  app: {
    head: {
      link: [{rel: 'icon', href: '/favicon.svg'}],
    },
  },
  css: ['@/assets/styles/main.scss'],
  typescript: {
    shim: false,
  },
  modules: [
    '@vueuse/nuxt',
  ],
})

// https://v3.nuxtjs.org/api/configuration/nuxt.config
import {resolve} from 'path';

const SRC = resolve(__dirname, 'src');

export default defineNuxtConfig({
  srcDir: SRC,
  ssr: false,
  app: {
    head: {
      title: 'Canvas 3D',
      link: [{rel: 'icon', href: '/favicon.svg'}],
    },
  },
  css: ['@/assets/styles/main.scss'],
  typescript: {
    typeCheck: true,
    shim: false,
  },
  modules: [
    '@vueuse/nuxt',
  ],
})

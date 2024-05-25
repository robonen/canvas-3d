export default defineNuxtConfig({
  srcDir: 'src',
  ssr: false,
  imports: {
    dirs: ['const'],
  },
  app: {
    head: {
      title: 'Canvas 3D',
      link: [{ rel: 'icon', href: '/favicon.svg' }],
    },
  },
  css: ['@/assets/styles/main.scss'],
  devtools: { enabled: true },
});

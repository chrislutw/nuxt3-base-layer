import { createResolver } from '@nuxt/kit'

const resolver = createResolver(import.meta.url)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  $meta: {
    name: 'base-layer',
  },
  modules: [
    // @nuxt/ui 3.0.0 在 base-layer 中使用會造成ssr時css裸奔的問題，需在最後的 app 專案使用，先關閉
    // '@nuxt/ui',
    '@vueuse/nuxt',
    // nuxt 3.16 尚未援，先關閉
    // '@nuxtjs/seo',
  ],
  css: [
    resolver.resolve('./app/assets/css/base-layer.css'),
  ],
  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    asyncContext: true,
  },

  runtimeConfig: {
    public: {
      apiBaseUrl: '',
      deployEnv: '',
    },
  },

  // seo module options 預設全關閉
  // ogImage: {
  //   enabled: false,
  // },
  // sitemap: {
  //   enabled: false,
  // },
  // robots: {
  //   enabled: false,
  // },
  // seo: { // seo utils
  //   enabled: false,
  // },
  // schemaOrg: {
  //   enabled: false,
  // },
  // linkChecker: {
  //   enabled: false,
  // },
})

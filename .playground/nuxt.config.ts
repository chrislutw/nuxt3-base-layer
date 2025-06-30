import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
  },

  future: {
    compatibilityVersion: 4,
  },

  experimental: {
    asyncContext: true,
  },

  extends: ['..'],
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/content',
  ],
  colorMode: { classSuffix: '' },
  css: ['~/assets/css/main.css'],

  eslint: {
    config: {
      // Use the generated ESLint config for lint root project as well
      rootDir: fileURLToPath(new URL('..', import.meta.url)),
      standalone: false,
    },
  },

  runtimeConfig: {
    public: {
      i18nBaseUrl: '',
    },
  },

  content: {
    build: {
      markdown: {
        highlight: {
          // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
          theme: {
            dark: 'material-theme-lighter',
            default: 'material-theme-palenight',
          },
        },
      },
    },
  },

  icon: {
    serverBundle: 'auto',
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
  },

  compatibilityDate: '2025-02-27',
})

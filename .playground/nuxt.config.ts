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
  alias: {
    '~root': fileURLToPath(new URL('../', import.meta.url)),
    '~root/*': fileURLToPath(new URL('../*', import.meta.url)),
  },

  extends: ['..'],
  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/content',
    'nuxt-og-image',
    'nuxt-llms',
  ],
  ui: {
    // colorMode: false,
  },
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
            default: 'material-theme-darker',
          },
        },
      },
    },
  },

  llms: {
    domain: 'https://chrislutw.github.io/nuxt3-base-layer',
    title: 'Base Layer',
    description: '為 nuxt 應用程式提供基礎設施的套件',
    sections: [
      {
        title: '文件',
        description: '技術文件與使用說明',
        contentCollection: 'docs',
      },
    ],
  },

  icon: {
    serverBundle: 'auto',
    clientBundle: {
      scan: true,
      includeCustomCollections: true,
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@nuxt/content/utils',
      ],
    },
  },

  compatibilityDate: '2025-02-27',
})

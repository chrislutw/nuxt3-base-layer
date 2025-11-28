export type DeployName = 'production' | 'staging' | 'dev' | 'uat' | ''

// 全域類型宣告檔案
// 這個檔案會被 TypeScript 自動載入，用來覆蓋 Nuxt 的預設類型

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    deployEnv: DeployName
  }
}

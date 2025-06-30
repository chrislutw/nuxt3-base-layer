export type DeployName = 'production' | 'staging' | 'dev' | 'uat' | '' | undefined

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    deployEnv: DeployName
  }
}

import type { ConsolaInstance } from 'consola'
import { useRoute } from '#app/composables/router'
import { useRuntimeConfig } from '#app/nuxt'
import { createConsola } from 'consola'

export function useLogger(): ConsolaInstance {
  const route = useRoute()
  const $config = useRuntimeConfig()
  const logger = createConsola()
  const isProduction = $config.public.deployEnv === 'production'

  if (isProduction) {
    logger.level = 0
  }
  if (route.query.debug) {
    logger.level = 4
  }
  if (route.query.trace) {
    logger.level = 5
  }

  logger.wrapConsole()

  return logger
}

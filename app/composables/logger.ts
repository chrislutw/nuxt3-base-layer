import type { ConsolaInstance, ConsolaOptions } from 'consola'
import { useRoute } from '#app/composables/router'
import { useRuntimeConfig } from '#app/nuxt'
import { createConsola } from 'consola'

/**
 * 日誌記錄器組合函數
 *
 * 根據環境和路由查詢參數配置日誌記錄等級的可組合函數。
 * - 在生產環境中，日誌等級設為 0（無輸出）
 * - 當路由查詢參數包含 `log` 時，日誌等級設為 3（完整訊息）
 * - 當路由查詢參數包含 `debug` 時，日誌等級設為 4（調試訊息）
 *
 * @param options - 日誌記錄器的部分配置選項
 * @param _route - 可選的路由物件；若未提供，則使用當前路由
 * @returns 配置完成的 ConsolaInstance 日誌記錄器實例
 *
 * @example
 * // 基本使用方式
 * const logger = useLogger()
 * logger.info('這是一則訊息')
 * // '這是一則訊息'
 *
 * const logger = useLogger().withTag('MyTag')
 * logger.info('這是一則訊息')
 * // [MyTag] '這是一則訊息'
 *
 * @example
 * // 帶有自訂選項
 * const logger = useLogger({ level: 3 })
 * logger.info('這是一則訊息')
 *
 * @example
 * // 在 middleware 中使用
 * export default defineNuxtRouteMiddleware((to) => {
 *   const logger = useLogger(undefined, to)
 *   logger.info('這是一則訊息')
 * })
 */
export function useLogger(options?: Partial<ConsolaOptions>, _route?: ReturnType<typeof useRoute>): ConsolaInstance {
  const route = _route || useRoute()
  const $config = useRuntimeConfig()
  const logger = createConsola(options)
  const isProduction = $config.public.deployEnv === 'production'

  if (isProduction) {
    logger.level = 0
  }
  if (route.query.log) {
    logger.level = 3
  }
  if (route.query.debug) {
    logger.level = 4
  }

  return logger
}

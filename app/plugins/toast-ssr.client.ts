import { promiseTimeout } from '@vueuse/core'

/**
 * 自動顯示 SSR 暫存的 toast 訊息
 */
export default defineNuxtPlugin(() => {
  // 只在 Client Side 執行
  if (import.meta.client) {
    const { showSSRMessages } = useToastSSR()

    // 在 DOM 準備完成後顯示訊息
    nextTick(() => {
      promiseTimeout(100).then(() => showSSRMessages())
    })
  }
})

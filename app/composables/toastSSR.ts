type ToastColor = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'

interface SSRToastMessage {
  title: string
  description?: string
  color?: ToastColor
}

interface ToastAddOptions {
  title: string
  description?: string
  color?: ToastColor
}

/**
 * 處理 SSR 環境下的 toast 訊息
 * 在 Server Side 時記錄訊息，在 Client Side 時顯示
 */
export function useToastSSR() {
  const toast = useToast()
  const ssrToastMessages = useState<SSRToastMessage[]>('ssr-toast-messages', () => [])

  /**
   * 加入 toast 訊息
   * 在 Server Side 時暫存，在 Client Side 時直接顯示
   */
  const add = (message: ToastAddOptions) => {
    if (import.meta.server) {
      // Server Side: 將訊息加入暫存陣列
      ssrToastMessages.value.push({
        title: message.title,
        description: message.description,
        color: message.color,
      })
    }
    else {
      // Client Side: 直接顯示 toast
      toast.add(message)
    }
  }

  /**
   * 在 Client Side 顯示所有暫存的 SSR 訊息
   */
  const showSSRMessages = () => {
    if (import.meta.client && ssrToastMessages.value.length > 0) {
      ssrToastMessages.value.forEach((message) => {
        toast.add(message)
      })
      // 清空暫存的訊息
      ssrToastMessages.value = []
    }
  }

  return {
    add,
    showSSRMessages,
  }
}

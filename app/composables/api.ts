import type { FetchOptions } from 'ofetch'
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import { useRuntimeConfig } from '#app/nuxt'
import { useToastSSR } from '#imports'
import defu from 'defu'
import { FetchError } from 'ofetch'

export type CoreApiResponse<DataT> = {
  Code: number
  Data: DataT
  Message?: string
}

// 統一的 API 選項型別
export interface ApiOptions<ResponseT> {
  alert?: boolean
  checkSuccessHandler?: (res: ResponseT, url: string, options: ApiOptions<ResponseT>) => void
  route?: RouteLocationNormalizedGeneric
}
export interface UseFetchOptionsConfig extends Pick<ApiOptions<unknown>, 'route'> { }

// 基本的 API 設定
export function useFetchOptions(_config: UseFetchOptionsConfig = {}) {
  const config = useRuntimeConfig()
  const logger = useLogger(undefined, _config.route)

  const defaults: FetchOptions = {
    method: 'GET',
    baseURL: config.public.apiBaseUrl,
    retry: false,
    onRequest({ request: url, options }) {
      const { body, params, method } = options

      logger.withTag(`Request ${method}`).debug(`${url}: data = `, body || params, options)
    },

    onRequestError({ request: url, options }) {
      const { body, params, method } = options

      logger.withTag(`Request Error ${method}`).debug(`${url}: data = `, body || params, options)
    },

    onResponse({ request: url, response, options }) {
      const res = response._data as CoreApiResponse<unknown>
      const { method } = options

      logger.withTag(`Response ${method}`).debug(`${url}: `, res)
    },

    onResponseError({ request: url, response, options }) {
      const { method } = options

      logger.withTag(`Response Error ${method}`).debug(`${url}: `, response)
    },
  }

  return { defaultFetchOptions: defaults }
}

// 強健的 FetchError 檢查函式
function isFetchErrorLike(error: unknown): boolean {
  if (!error)
    return false

  // 多重檢查策略
  return (
    error instanceof FetchError
    || (typeof error === 'object' && error !== null && (error as any).constructor?.name === 'FetchError')
    || (typeof error === 'object' && error !== null && (error as any).name === 'FetchError')
    || (typeof error === 'object' && error !== null && (error as any).constructor === FetchError)
    || Object.prototype.toString.call(error) === '[object FetchError]'
    // 檢查是否具有 FetchError 的特徵屬性
    || (typeof error === 'object'
      && error !== null
      && 'statusCode' in error
      && 'statusMessage' in error
      && 'data' in error)
  )
}

type catchHandlerOptions = {
  url: string
  toast: ReturnType<typeof useToastSSR>
  logger: ReturnType<typeof useLogger>
}

function apiCatchHandler(error: unknown, options: catchHandlerOptions) {
  const { url, toast, logger } = options
  // 使用更可靠的錯誤類型檢查
  if (isFetchErrorLike(error)) {
    const fetchError = error as FetchError
    if (fetchError.statusCode) {
      toast.add({
        title: `Error [${fetchError.statusCode}]`,
        description: fetchError.message || fetchError.statusText || 'Network Error',
        color: 'error',
      })
    }
    logger.withTag(`FetchError`).debug(`${url}: `, fetchError)
  }
  // 處理其他未知錯誤
  else {
    const errorMessage = error instanceof Error ? error.message : 'Unknown Error'
    toast.add({
      title: `Error [Unknown]`,
      description: errorMessage,
      color: 'error',
    })
    logger.withTag(`Unknown Error`).debug(`${url}: `, error)
  }
}

// 通用的 API 處理模式的上下文介面
interface FetchPatternContext {
  toast: ReturnType<typeof useToastSSR>
  logger: ReturnType<typeof useLogger>
}

// 通用的 API 處理模式
function createFetchPattern<ResponseT>(
  api: ReturnType<typeof $fetch.create<ResponseT>>,
  url: string,
  params: FetchOptions | undefined,
  options: ApiOptions<ResponseT>,
  context: FetchPatternContext,
): Promise<ResponseT | undefined> {
  return api(url, params as Parameters<typeof api>[1])
    .then((res: ResponseT) => {
      // 執行自訂的成功處理器
      if (options.checkSuccessHandler) {
        options.checkSuccessHandler(res, url, options)
      }

      return res
    })
    .catch((error: unknown) => {
      if (options.alert) {
        apiCatchHandler(error, { url, toast: context.toast, logger: context.logger })
      }

      return undefined
    })
}

// 專案的 API 設定
export async function usePublicApi<DataT, ResponseT = CoreApiResponse<DataT>>(
  url: string,
  fetchOptions?: FetchOptions | undefined,
  apiOptions?: ApiOptions<ResponseT>,
) {
  const { defaultFetchOptions } = useFetchOptions({ route: apiOptions?.route })
  const api = $fetch.create<ResponseT>(defaultFetchOptions)
  const toast = useToastSSR()
  const logger = useLogger(undefined, apiOptions?.route)

  const defaultOptions: ApiOptions<ResponseT> = {
    alert: true,
    checkSuccessHandler: (res: ResponseT, url: string, options: ApiOptions<ResponseT>) => {
      const coreRes = res as unknown as CoreApiResponse<DataT>
      // 如果是 CoreApiResponse 結構，進行錯誤處理
      if (coreRes.Code !== undefined && coreRes.Code !== 0) {
        if (options.alert) {
          toast.add({
            title: `Error [${coreRes.Code}]`,
            description: coreRes.Message,
            color: 'error',
          })
        }
        logger.withTag(`ProjectApiResponse Error`).debug(`${url}: `, coreRes)
      }
    },
  }

  // defu 有提供類型定義如有需要也可直接產出正確的類型
  // https://github.com/unjs/defu?tab=readme-ov-file#type
  const params = defu(fetchOptions, defaultFetchOptions)
  const options = defu(apiOptions, defaultOptions)

  return createFetchPattern<ResponseT>(
    api,
    url,
    params,
    options,
    { toast, logger },
  )
}

// 第三方 API 設定
export async function useThirdPartyPublicApi<DataT>(
  url: string,
  fetchOptions?: FetchOptions | undefined,
  apiOptions?: ApiOptions<DataT>,
) {
  const logger = useLogger(undefined, apiOptions?.route)
  const { defaultFetchOptions } = useFetchOptions({ route: apiOptions?.route })
  const thirdPartyDefaultFetchOptions: FetchOptions = {
    ...defaultFetchOptions,
    onResponse({ request: url, response, options }) {
      const res = response._data as DataT
      const { method } = options

      logger.withTag(`Response ${method}`).debug(`[Response] ${url}: `, res)
    },
  }
  const api = $fetch.create<DataT>(thirdPartyDefaultFetchOptions)

  const toast = useToastSSR()
  const params: FetchOptions = defu(fetchOptions, thirdPartyDefaultFetchOptions)

  const defaultOptions: ApiOptions<DataT> = {
    alert: true,
    // 在第三方 API 預設不做任何成功檢查，因為nuxt已經判斷 status code 不是 200 會直接進入 catch
  }
  const options = defu(apiOptions, defaultOptions)

  return createFetchPattern<DataT>(
    api,
    url,
    params,
    options,
    { toast, logger },
  )
}

// 專案的需要驗證 API 設定
export async function useAuthApi<DataT, ResponseT = CoreApiResponse<DataT>>(
  url: string,
  fetchOptions?: FetchOptions | undefined,
  apiOptions?: ApiOptions<ResponseT>,
) {
  const token = useCookie('token', { default: () => '' })
  const authConfig: FetchOptions = {
    headers: { Authorization: `Bearer ${token.value}` },
  }
  const params = defu(fetchOptions, authConfig)

  return usePublicApi<DataT, ResponseT>(url, params, apiOptions)
}

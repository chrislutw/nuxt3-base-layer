import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack/types'
import type { FetchOptions } from 'ofetch'
import type { ApiOptions, CoreApiResponse, DataT } from '../types/api'
import { useRuntimeConfig } from '#app/nuxt'
import { useLocalStorage, useToast } from '#imports'
import defu from 'defu'
import { FetchError } from 'ofetch'
import { CoreApiErrorResponse } from '../types/api'
import { useLogger } from './logger'

// 基本的 API 設定
function useApi() {
  const config = useRuntimeConfig()
  const logger = useLogger()

  const defaults: FetchOptions = {
    method: 'GET',
    baseURL: config.public.apiBaseUrl,
    retry: false,
    onRequest({ request: url, options }) {
      const { body, params, method } = options

      if (import.meta.client)
        logger.withTag(`[Request][${method}]`).trace(`${url}: data = `, body || params, options)
    },

    onRequestError({ request: url, options }) {
      const { body, params, method } = options

      if (import.meta.client)
        logger.withTag(`[Request Error][${method}]`).trace(`${url}: data = `, body || params, options)
    },

    onResponse({ request: url, response, options }) {
      const res = response._data as CoreApiResponse<any>
      const { method } = options

      if (import.meta.client)
        logger.withTag(`[Response][${method}]`).trace(`${url}: `, res)
    },

    onResponseError({ request: url, response, options }) {
      const { method } = options
      if (import.meta.client)
        logger.withTag(`[Response Error][${method}]`).trace(`${url}: `, response)
    },
  }

  const api = $fetch.create<CoreApiResponse<DataT>>(defaults)

  return { api, defaultFetchOptions: defaults }
}

const defaultApiOptions: ApiOptions = {
  alert: true,
}

// 專案的 API 設定
export async function usePublicApi<DataT>(
  url: string,
  fetchOptions?: NitroFetchOptions<NitroFetchRequest>,
  apiOptions: ApiOptions = defaultApiOptions,
): Promise<CoreApiResponse<DataT> | undefined> {
  const { api, defaultFetchOptions } = useApi()
  const params: NitroFetchOptions<NitroFetchRequest> = defu(fetchOptions, defaultFetchOptions)
  const toast = useToast()
  return api(url, params)
    .then((res) => {
      // API 層級的錯誤處理
      if (res.Code !== 0) {
        throw new CoreApiErrorResponse(res)
      }

      return res
    })
    .catch((error: FetchError | CoreApiResponse<any>) => {
      if (apiOptions.alert) {
        if (error instanceof CoreApiErrorResponse) {
          toast.add({ title: 'API 發生錯誤，CoreApiErrorResponse' })
        }
        if (error instanceof FetchError) {
          toast.add({ title: 'API 發生錯誤，FetchError' })
        }
      }

      return undefined
    })
}

// 第三方 API 設定
export async function useThirdPartyPublicApi<DataT>(
  url: string,
  fetchOptions?: NitroFetchOptions<NitroFetchRequest>,
  apiOptions?: ApiOptions,
): Promise<DataT | undefined> {
  const { api, defaultFetchOptions } = useApi()
  const logger = useLogger()
  const params: NitroFetchOptions<NitroFetchRequest> = defu({
    ...fetchOptions,
    onResponse({ request: url, response, options }) {
      const res = response._data as DataT
      const { method } = options

      if (import.meta.client)
        logger.withTag(`[Response][${method}]`).trace(`[Response] ${url}: `, res)
    },
  }, defaultFetchOptions)
  const toast = useToast()
  return api<DataT>(url, params)
    .then((res) => {
      return res
    })
    .catch((error: FetchError) => {
      if (apiOptions?.alert) {
        if (error instanceof FetchError) {
          toast.add({ title: 'API 發生錯誤，FetchError' })
        }
      }

      return undefined
    })
}

// 專案的需要驗證 API 設定
export async function useAuthApi<DataT>(
  url: string,
  fetchOptions?: NitroFetchOptions<NitroFetchRequest>,
  apiOptions?: ApiOptions,
): Promise<CoreApiResponse<DataT> | undefined> {
  const token = useLocalStorage('token', '')
  const authConfig = {
    headers: { Authorization: `Bearer ${token.value}` },
  }
  const params: NitroFetchOptions<NitroFetchRequest> = defu(fetchOptions, authConfig)

  return usePublicApi<DataT>(url, params, apiOptions)
}

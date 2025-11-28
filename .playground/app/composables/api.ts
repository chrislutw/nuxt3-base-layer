import { useRuntimeConfig } from '#imports'

// 以下為個別 API 的使用範例

export async function useLangApi(langCode: string) {
  const config = useRuntimeConfig()
  const langUrl = `${config.public.i18nBaseUrl}/Language/${langCode}?GroupIds[]=TOURNWEB`
  const res = await usePublicApi<Record<string, any>>(langUrl, {}, { alert: true })
  return res?.Data
}

export async function useProjectErrorApi() {
  const url = `/history/ab/get-history-record`
  const res = await usePublicApi<Record<string, any>>(url, {}, { alert: true })
  return res?.Data
}

export async function useLangFetchErrorApi(langCode: string) {
  const langUrl = `https://foo.bar/Language/${langCode}?GroupIds[]=TOURNWEB`
  const res = await usePublicApi<Record<string, any>>(langUrl, {}, { alert: true })
  return res?.Data
}

export async function useThirdPartyApi() {
  const url = `https://jsonplaceholder.typicode.com/posts/1`
  const res = await useThirdPartyPublicApi<Record<string, any>>(url, {}, { alert: true })
  return res
}

export async function useThirdPartyErrorApi() {
  const url = `https://jsonplaceholder.typicode.com/postsqwe/1`
  const res = await useThirdPartyPublicApi<Record<string, any>>(url, {}, { alert: true })
  return res
}

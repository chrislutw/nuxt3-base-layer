export default defineEventHandler((e) => {
  const config = useRuntimeConfig(e)
  const path = config.public.deployEnv === 'production' ? '' : '/'
  const siteMapConfig = config.public.siteUrl ? `Sitemap: ${config.public.siteUrl}/sitemap.xml` : ''

  // 設定正確的 Content-Type 為 text/plain
  setResponseHeader(e, 'content-type', 'text/plain')

  return `User-agent: *
Disallow: ${path}

${siteMapConfig}
`
})

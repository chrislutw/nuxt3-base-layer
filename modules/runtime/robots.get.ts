export default defineEventHandler((e) => {
  const config = useRuntimeConfig(e)
  const path = config.public.envName === 'production' ? '' : '/'

  return `User-agent: *
Disallow: ${path}
  `
})

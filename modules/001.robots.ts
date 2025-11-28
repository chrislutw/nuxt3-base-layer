import { addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  /**
   * 自訂 robots.txt handler 的路徑
   * 如果提供，將使用此路徑的 handler；否則使用 layer 預設的 handler
   */
  customHandler?: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-base-layer-robots',
    configKey: 'baseLayerRobots',
  },
  defaults: {},
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const projectResolver = createResolver(nuxt.options.rootDir)
    const layerRobotsHandler = resolver.resolve('./runtime/robots.get')

    let handlerPath = layerRobotsHandler

    // 如果 options 中提供了自訂 handler 路徑
    if (options.customHandler) {
      const customHandler = projectResolver.resolve(options.customHandler)
      handlerPath = customHandler
      console.log('[nuxt3-base-layer] robots module Using custom robots handler:', customHandler)
    }
    else {
      console.log('[nuxt3-base-layer] robots module Using default layer robots handler')
    }

    addServerHandler({
      route: '/robots.txt',
      handler: handlerPath,
    })

    // 也在 generate 階段添加 robots.txt 文件的預渲染
    nuxt.hooks.hook('nitro:config', (nitroConfig) => {
      nitroConfig.prerender = nitroConfig.prerender || {}
      nitroConfig.prerender.routes = nitroConfig.prerender.routes || []

      // 添加 robots.txt 到預渲染路由清單
      if (!nitroConfig.prerender.routes.includes('/robots.txt')) {
        nitroConfig.prerender.routes.push('/robots.txt')
      }
    })
  },
})

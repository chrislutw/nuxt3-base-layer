import { addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  setup(options) {
    const resolver = createResolver(import.meta.url)
    console.log('[nuxt3-base-layer] robots module Adding /robots.txt handler')
    addServerHandler({
      route: '/robots.txt',
      handler: resolver.resolve('./runtime/robots.get'),
    })
  },
})

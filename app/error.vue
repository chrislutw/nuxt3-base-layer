<script setup lang="ts">
import type { NuxtError } from '#app'
import { UIcon } from '#components'

const props = defineProps({
  error: Object as () => NuxtError,
})

const pageStyle = usePageStyle()
useHead({
  htmlAttrs: {
    style: pageStyle.value,
  },
})

const nuxtApp = useNuxtApp()
const isInstallI18n = useSupported(() => '$i18n' in nuxtApp)
const pageContent = computed(() => {
  // isInstallI18n ?  || 'Error'

  return {
    title: 'Error',
    desc: 'Some thing went wrong',
  }
})

const errorStatusCode = computed(() => props.error?.statusCode || 'unknown')
</script>

<template>
  <UContainer class="flex h-full flex-col items-center justify-center py-4">
    <!-- <SiteLogo class="mb-20 self-start" /> -->
    <div class="flex items-center justify-center">
      <UIcon name="i-lucide-triangle-alert" alt="error" class="size-24 sm:size-36 block text-error-500" />
      <div class="ml-4">
        <h1 class="mb-4 text-5xl font-bold sm:text-7xl">
          <!-- {{ $t('TOURNWEB_ERROR') }} -->
          {{ pageContent.title }}
        </h1>
        <h2 class="text-xl sm:text-2xl">
          <!-- {{ $t('TOURNWEB_ERROR_BACKEND_OTHERS') }} -->
          {{ pageContent.desc }}
        </h2>
      </div>
    </div>
    <div v-if="$route.query.debug" class="mt-8 max-w-full space-y-2">
      <h1 class="text-6xl font-bold sm:text-7xl">
        {{ errorStatusCode }}
      </h1>
      <h2 class="text-2xl sm:text-3xl">
        {{ error?.message }}
      </h2>
      <div class="w-full overflow-auto">
        {{ error?.stack }}
      </div>
    </div>
  </UContainer>
</template>

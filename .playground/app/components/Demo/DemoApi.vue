<script lang="ts" setup>
import { useLangApi, useLangFetchErrorApi, useLogger, useProjectErrorApi, useThirdPartyApi, useThirdPartyErrorApi } from '#imports'

const logger = useLogger().withTag('home page')

// 只會透過按鈕觸發的 API 不用需要包裝在 useFetch or useAsyncData
async function openNormal() {
  const result = await useLangApi('zh-CN')
  logger.log('page call: ', result)
}
async function openApiError() {
  const result = await useProjectErrorApi()
  logger.log('page call: ', result)
}
async function openFetchError() {
  const result = await useLangFetchErrorApi('zh-CN')
  logger.log('page call: ', result)
}
async function openThirdParty() {
  const result = await useThirdPartyApi()
  logger.log('page call: ', result)
}
async function openThirdPartyError() {
  const result = await useThirdPartyErrorApi()
  logger.log('page call: ', result)
}
</script>

<template>
  <div class="flex flex-col items-center space-y-4">
    <UButton icon="i-heroicons-book-open" @click="openNormal">
      Trigger API
    </UButton>
    <UButton icon="i-heroicons-book-open" @click="openApiError">
      Trigger API With API Error
    </UButton>
    <UButton icon="i-heroicons-book-open" @click="openFetchError">
      Trigger API With Fetch Error
    </UButton>
    <UButton icon="i-heroicons-book-open" @click="openThirdParty">
      Trigger API With ThirdParty
    </UButton>
    <UButton icon="i-heroicons-book-open" @click="openThirdPartyError">
      Trigger API With ThirdParty Error
    </UButton>
  </div>
</template>

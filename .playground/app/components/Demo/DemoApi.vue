<script lang="ts" setup>
import { useAsyncData } from '#app/composables/asyncData'
import { useLangApi, useLangFetchErrorApi, useLogger, useProjectErrorApi, useThirdPartyApi, useThirdPartyErrorApi } from '#imports'

const logger = useLogger().withTag('home page')
const config = useRuntimeConfig()
type ThirdPartyDataPost = {
  userId: number
  id: number
  title: string
  body: string
}
// 頁面級別的 API，供整個頁面使用，可使用多個 $fetch API 組成
const { data, refresh } = await useAsyncData<ThirdPartyDataPost>('dataKey', async () => {
  const res = await useThirdPartyApi() as ThirdPartyDataPost || undefined
  return res
})

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
  <UContainer>
    <UCard class="mt-10">
      <h2>UseApi</h2>
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
        <div v-if="data">
          <UButton icon="i-heroicons-book-open" @click="refresh()">
            Refresh Data
          </UButton>
          <p>Async Data:</p>
          <p>ID:{{ data.id }} Author by User:{{ data.userId }}</p>
          <div>Title: <UInput v-model="data.title" /></div>
          <p>Content: {{ data.body }}</p>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

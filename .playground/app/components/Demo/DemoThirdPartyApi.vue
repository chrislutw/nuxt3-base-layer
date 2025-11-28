<script lang="ts" setup>
import { useAsyncData } from '#imports'

type ThirdPartyDataPost = {
  userId: number
  id: number
  title: string
  body: string
}
// 頁面級別的 API，供整個頁面使用，可使用多個 $fetch API 組成
const { data, refresh } = await useAsyncData('dataKey', async () => {
  const url = `https://jsonplaceholder.typicode.com/posts/1`
  const res = await useThirdPartyPublicApi<ThirdPartyDataPost>(url, {}, { alert: true }) || null
  return res
})
</script>

<template>
  <div class="flex flex-col items-center space-y-4">
    <div v-if="data">
      <UButton icon="i-heroicons-book-open" @click="refresh()">
        Refresh Data
      </UButton>
      <p>ID:{{ data.id }} Author by User:{{ data.userId }}</p>
      <div>Title: <UInput v-model="data.title" class="w-[calc(100%-60px)]" /></div>
      <p>Content: {{ data.body }}</p>
    </div>
  </div>
</template>

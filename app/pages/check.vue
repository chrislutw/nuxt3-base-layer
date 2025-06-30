<script setup lang="ts">
definePageMeta({
  layout: false,
})
const pageStyle = usePageStyle()
useHead({
  htmlAttrs: {
    style: pageStyle.value,
  },
})
</script>

<template>
  <UContainer class="h-svh">
    <div
      class="flex flex-col h-full space-y-2 text-light-50 justify-center items-center"
    >
      <UIcon name="i-fluent-presence-available-10-filled" class="size-12 text-(--ui-primary)" />
      <h1 class="text-4xl block">
        Site is Lived
      </h1>
    </div>
  </UContainer>
</template>

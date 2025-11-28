<script setup lang="ts">
const { data: navigation } = await useAsyncData('navigation', () =>
  queryCollectionNavigation('docs'))

const appConfig = useAppConfig()
</script>

<template>
  <div class="mx-auto flex max-w-none justify-between p-4 sm:px-8">
    <!-- Navigation -->
    <div class="text-neutral-700 dark:text-neutral-200">
      <NuxtLink
        v-for="link in navigation"
        :key="link.path" class="mr-6"
        :to="link.path"
        active-class="font-bold"
      >
        {{ link.title }}
      </NuxtLink>
    </div>
    <!-- Social icons & Color Mode -->
    <div class="space-x-3 text-neutral-500 transition">
      <!-- <a
        v-if="appConfig.socials?.twitter || appConfig.socials?.x"
        class="hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300"
        :href="`https://x.com/${appConfig.socials?.twitter || appConfig.socials?.x}`"
        title="X"
      >
        <Icon class="size-5" name="i-simple-icons-x" />
      </a>
      <a
        v-if="appConfig.socials?.github"
        class="hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300"
        :href="`https://github.com/${appConfig.socials?.github}`"
        title="GitHub"
      >
        <Icon class="size-5" name="i-simple-icons-github" />
      </a> -->
      <ColorModeSwitch class="hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300" />
    </div>
  </div>
</template>

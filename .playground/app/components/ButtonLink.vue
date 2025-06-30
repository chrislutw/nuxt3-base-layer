<script setup>
defineProps({
  href: {
    type: String,
    required: true,
  },
  external: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <span class="not-prose">
    <NuxtLink
      :to="href"
      :external="external"
      class="!dark:text-neutral-950 inline-flex items-center gap-1 rounded bg-neutral-800 px-3 py-1 !text-white no-underline dark:bg-neutral-200"
    >
      <Icon
        v-if="icon"
        :name="icon"
        class="size-4"
      />
      <slot mdc-unwrap="p" />
    </NuxtLink>
  </span>
</template>

<script lang="ts" setup>
import { useMouse } from '@vueuse/core'

const { x, y } = useMouse()
</script>

<template>
  <UContainer>
    <UCard class="mt-10">
      <h2>VueUse</h2>
      <div class="flex flex-col items-center space-y-4">
        <div>
          <p>Mouse Position: {{ x }}, {{ y }}</p>
        </div>
      </div>
    </UCard>
  </UContainer>
</template>

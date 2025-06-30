export function usePageStyle() {
  const colorMode = useColorMode()
  return computed(() => {
    if (colorMode.value === 'dark') {
      return {
        '--ui-bg': 'var(--ui-color-primary-950)',
        '--ui-text': 'var(--ui-color-primary-50)',

      }
    }

    return {
      '--ui-bg': 'var(--ui-color-primary-50)',
      '--ui-text': 'var(--ui-color-primary-900)',
    }
  })
}

type StyleConfig = {
  bg: string
  text: string
  dark: {
    bg: string
    text: string
  }
}
const defaultStyle = {
  bg: 'var(--ui-color-primary-50)',
  text: 'var(--ui-color-primary-900)',
  dark: {
    bg: 'var(--ui-color-primary-950)',
    text: 'var(--ui-color-primary-50)',
  },
}

export function usePageStyle(config: Partial<StyleConfig> = defaultStyle) {
  const colorMode = useColorMode()
  return computed(() => {
    const style: Partial<{ '--ui-bg': string, '--ui-text': string }> = {}

    if ('value' in colorMode && colorMode.value === 'dark') {
      if (config.dark) {
        if (config.dark.bg)
          style['--ui-bg'] = config.dark.bg
        if (config.dark.text)
          style['--ui-text'] = config.dark.text
        return style
      }
      return style
    }

    if (config.bg)
      style['--ui-bg'] = config.bg
    if (config.text)
      style['--ui-text'] = config.text

    return style
  })
}

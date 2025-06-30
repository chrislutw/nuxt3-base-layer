export default defineAppConfig({
  myLayer: {
    name: 'My amazing Nuxt layer (overwritten)',
  },
  cover: '/cover.jpg',
  icon: {
    aliases: {
      'dark-mode': 'lucide-moon',
      'light-mode': 'lucide-sun',
    },
  },
})

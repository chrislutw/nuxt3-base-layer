export default defineAppConfig({
  title: 'Base Layer',
  myLayer: {
    name: 'My amazing Nuxt layer (overwritten)',
  },
  socials: {
    github: 'old-ts-web/nuxt3-base-layer',
  },
  cover: '/cover.jpg',

  header: {
    title: 'Base Layer',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: '',
    },
    search: true,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/old-ts-web/nuxt3-base-layer',
      'target': '_blank',
      'aria-label': 'GitHub',
    }],
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: true,
    links: [{
      'icon': 'i-simple-icons-github',
      'to': 'https://github.com/old-ts-web/nuxt3-base-layer',
      'target': '_blank',
      'aria-label': 'base layer',
    }],
  },

  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/nuxt-ui-templates/docs/edit/main/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/nuxt/ui',
        target: '_blank',
      }, {
        icon: 'i-lucide-book-open',
        label: 'Nuxt UI docs',
        to: 'https://ui4.nuxt.com/docs/getting-started/installation/nuxt',
        target: '_blank',
      }],
    },
  },

  icon: {
    aliases: {
      'dark-mode': 'lucide-moon',
      'light-mode': 'lucide-sun',
    },
  },
})

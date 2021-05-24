const { description } = require('../../package');

const sidebar = {
  en: {
    '/dev-docs/': [
      {
        collapsable: false,
        sidebarDepth: 2,
        title: '📦 Packages',
        children: [
          ['/dev-docs/packages/leemons/', 'leemons'],
          ['/dev-docs/packages/leemons-database/', 'leemons-database'],
          ['/dev-docs/packages/leemons-connector-bookshelf/', 'leemons-connector-bookshelf'],
          ['/dev-docs/packages/leemons-utils/', 'leemons-utils']
        ]
      }
    ]
  },
  es: {
    '/es/dev-docs/': [
      {
        collapsable: false,
        sidebarDepth: 2,
        title: '📦 Paquetes',
        children: [
          ['/es/dev-docs/packages/leemons/', 'leemons'],
          ['/es/dev-docs/packages/leemons-database/', 'leemons-database'],
          ['/es/dev-docs/packages/leemons-connector-bookshelf/', 'leemons-connector-bookshelf'],
          ['/es/dev-docs/packages/leemons-utils/', 'leemons-utils']
        ]
      }
    ]
  }
};

const navbar = {
  en: [
    {
      text: 'Documentation',
      items: [
        {
          text: 'Developer Docs',
          items: [
            {
              text: 'Packages',
              link: '/dev-docs/packages/leemons/'
            }
          ]
        }
      ]
    },
    {
      text: 'VuePress',
      link: 'https://v1.vuepress.vuejs.org/'
    },
    {
      text: 'GitHub',
      link: 'https://github.com/leemonade/leemons-docs'
    }
  ],
  es: [
    {
      text: 'Documentación',
      items: [
        {
          text: 'Para desarrolladores',
          items: [
            {
              text: 'Paquetes',
              link: '/es/dev-docs/packages/leemons/'
            }
          ]
        }
      ]
    },
    {
      text: 'VuePress',
      link: 'https://v1.vuepress.vuejs.org/'
    },
    {
      text: 'GitHub',
      link: 'https://github.com/leemonade/leemons-docs'
    }
  ]
};

const locales = {
  '/': {
    lang: 'en-US',
    title: 'Leemons Docs',
    description
  },
  '/es/': {
    lang: 'es-ES',
    title: 'Documentación de Leemons',
    description
  }
};

const localesTheme = {
  '/': {
    selectText: 'Languages',
    label: 'English',
    editLinkText: 'Edit this page on GitHub',
    sidebar: sidebar.en,
    nav: navbar.en
  },
  '/es/': {
    selectText: 'Idiomas',
    label: 'Español',
    editLinkText: 'Edita esta página en GitHub',
    sidebar: sidebar.es,
    nav: navbar.es
  }
};

module.exports = {
  locales,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    locales: localesTheme
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/plugin-active-header-links',
    'vuepress-plugin-element-tabs'
  ]
};

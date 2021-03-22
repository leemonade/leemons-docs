const { description } = require('../../package');

const sidebar = {
  developer: [
    {
      collapsable: false,
      sidebarDepth: 1,
      title: '📦 Packages',
      children: [
        ['/dev-docs/packages/leemons/', 'leemons'],
        ['/dev-docs/packages/leemons-database/', 'leemons-database'],
        ['/dev-docs/packages/leemons-connector-bookshelf/', 'leemons-connector-bookshelf'],
        ['/dev-docs/packages/leemons-utils/', 'leemons-utils']
      ]
    }
  ]
};

module.exports = {
  title: 'Leemons documentation',
  description: description,

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
    nav: [
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
    sidebar: {
      '/dev-docs': sidebar.developer
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    '@vuepress/plugin-active-header-links',
    'vuepress-plugin-element-tabs',

  ]
};

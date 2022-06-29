// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsDark');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Leemons docs',
  tagline: 'The powerful flexible friendly Learning Experience Platform you’re waiting for',
  url: 'https://docs.leemons.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'leemonade', // Usually your GitHub org/user name.
  projectName: 'leemons', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: {
        htmlLang: 'en-US',
      },
      es: {
        htmlLang: 'es-ES',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/leemonade/leemons-docs/tree/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Leemons docs',
        logo: {
          alt: 'Leemons Logo',
          src: 'img/logo-leemons.png',
        },
        items: [
          // {
          //  type: 'localeDropdown',
          //  position: 'right',
          // },
          {
            href: 'https://github.com/leemonade/leemons',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Installation',
                to: '/getting-started/installation',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/leemons',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/wbgMhkrWBp',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/leemonsedtech',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/leemonade/leemons',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      metadata: [
        {
          property: 'og:image',
          content:
            'https://s3.eu-west-1.amazonaws.com/global-assets.leemons.io/Logo_1200x620_B_bc44bfa5fe.png',
        },
      ],
    }),
};

module.exports = config;

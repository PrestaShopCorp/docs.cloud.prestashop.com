const { description } = require('../../package')

module.exports = {
  title: 'Prestashop Integration Framework',
  description: '',
  theme: '',

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
   head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/images/favicons/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/images/favicons/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/images/favicons/favicon-16x16.png"}],
    ['link', { rel: "manifest", href: "/assets/images/favicons/site.webmanifest"}],
    ['link', { rel: "mask-icon", href: "/assets/images/favicons/safari-pinned-tab.svg", color: "#3a0839"}],
    ['link', { rel: "shortcut icon", href: "/assets/images/favicons/favicon.ico"}],
    ['meta', { name: "msapplication-TileColor", content: "#011638"}],
    ['meta', { name: "msapplication-config", content: "/assets/images/favicons/browserconfig.xml"}],
    ['meta', { name: "theme-color", content: "#011638"}],
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
    displayAllHeaders: true,
    sidebarDepth: 1,
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Standard Module Development References',
        ariaLabel: 'Standard Module Development References',
        items: [
          { text: 'Module Developer Guide', link: 'https://devdocs.prestashop-project.org/' },
          { text: 'Module Generator', link: 'https://validator.prestashop.com/generator' },
          { text: 'Built For module example', link: 'https://github.com/PrestaShopCorp/builtforjsexample'}
        ]
      },
      { text: 'PrestaShop Documentation', link: 'https://doc.prestashop.com/' },
    ],
    sidebar: [
      { title: 'Introduction', path: '0-introduction/'},
      { title: 'How It Works', path: '/1-how-it-works/'},
      {
        title: 'Before Starting',
        //path: '/2-before-starting/',
        sidebarDepth: 0,
        collapsable: false,
        initialOpenGroupIndex: 0,
        children: [
          {
            path: "/2-before-starting/#available-tools",
            title: "Available Tools"
          },
          {
            path: "/2-before-starting/#preparing-for-technical-validation",
            title: "Preparing for Technical Validation"
          },
          {
            path: "https://meetings.hubspot.com/esteban-martin3/prestashop-new-framework-integration-meeting?utm_campaign=documentation&utm_source=sidebar&utm_medium=link",
            title: "Plan my Built For PrestaShop development"
          }
        ],
      },
      { title: 'Preparing Your Environment', path: '/3-preparing-your-environment/'},
      { title: 'Integrating PrestaShop Account', path: '/4-prestashop-account/'},
      {
        title: "PrestaShop Billing",
        sidebarDepth: 0,
        collapsable: false,
        initialOpenGroupIndex: 0,
        children: [
          {
            path: "/5-prestashop-billing/1-overview/",
            title: "Overview",
          },
          "/5-prestashop-billing/2-concepts/",
          "/5-prestashop-billing/3-tutorial/",
          {
            title: "How-Tos",
            sidebarDepth: 0,
            collapsable: false,
            children: [
              '/5-prestashop-billing/4-how-tos/1-stairstep/',
              '/5-prestashop-billing/4-how-tos/2-display-invoice-pane/',
              '/5-prestashop-billing/4-how-tos/3-customize-cancellation/',
              '/5-prestashop-billing/4-how-tos/4-handle-plan-selection/',
            ],
          },
          {
            title: "Use Cases",
            sidebarDepth: 0,
            collapsable: false,
            children: [
              '/5-prestashop-billing/5-use-cases/1-flat-fee/',
              '/5-prestashop-billing/5-use-cases/2-stair-step/',
              '/5-prestashop-billing/5-use-cases/3-usage-based/',
              '/5-prestashop-billing/5-use-cases/4-charge-at-term/',
            ],
          },
          {
            title: 'References',
            sidebarDepth: 0,
            collapsable: false,
            children: [
              '/5-prestashop-billing/6-references/1-webhook/',
              '/5-prestashop-billing/6-references/2-billing-api/',
              '/5-prestashop-billing/6-references/3-billing-cdc/',
            ]
          }
        ],
      },
      { title: 'Integrating PrestaShop CloudSync', path: '/7-prestashop-cloudsync/'},
      { title: 'APIs', path: '/8-apis/'},
      { title: 'Submitting Your Module', path: '/9-submitting-your-module/'},
      { title: 'Validation Checklist', path: '/10-validation-checklist/'},
      { title: 'FAQ', path: '/11-faq/'},
      { title: 'Legacy Procedure for Account and Billing', path: '/12-legacy-account-and-billing/'},

    ],
  },

  plugins: [
    'code-switcher' ,
    [
      'vuepress-plugin-medium-zoom',
      {
        delay: 200,
        options: {
          background: '#888888',
          margin: 24,
          scrollOffset: 0,
        },
      },
    ],
  ],

  markdown: {
    lineNumbers: true,
    extendMarkdown: (md) => {
      (md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const hrefIndex = token.attrIndex("src");
        const src = token.attrs[hrefIndex][1];
        const classesIndex = token.attrIndex("class");
        const classes = classesIndex >= 0 ? token.attrs[classesIndex][1] : "";
        if (classes.indexOf("book-meeting") >= 0) {
          return `<a href="https://meetings.hubspot.com/esteban-martin3/prestashop-new-framework-integration-meeting" target="_blank"><img src="${src}" alt="Book an appointment"></a>`;
        } else {
          return self.renderToken(tokens, idx, options);
        }
      }),
        md.use(require("markdown-it-attrs"), {
          // optional, these are default options
          leftDelimiter: "{#",
          rightDelimiter: "#}",
          allowedAttributes: [], // empty array = all attributes are allowed
        });
    },
  },
};

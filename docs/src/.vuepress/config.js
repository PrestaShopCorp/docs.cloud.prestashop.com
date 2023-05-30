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
      { text: 'Getting Started',
        items: [
          { text: 'Account', link: '/4-prestashop-account/' },
          { text: 'Billing', link: '/5-prestashop-billing/1-overview/' },
          { text: 'Billing Webhooks', link: '/6-billing-webhooks-events/' },
          { text: 'CloudSync', link: '/7-prestashop-cloudsync/' },
        ]
      },
      {
        text: 'Standard Module Development References',
        ariaLabel: 'Standard Module Development References',
        items: [
          { text: 'Module Developer Guide', link: 'https://devdocs.prestashop-project.org/' },
          { text: 'Module Generator', link: 'https://validator.prestashop.com/generator' }
        ]
      },
      { text: 'PrestaShop Documentation', link: 'https://doc.prestashop.com/' },
    ],
    sidebar: [
      { title: 'Introduction', path: '0-introduction/'},
      { title: 'How It Works', path: '/1-how-it-works/'},
      { title: 'Before Starting', path: '/2-before-starting/'},
      { title: 'Preparing Your Environment', path: '/3-preparing-your-environment/'},
      { title: 'Integrating PrestaShop Account', path: '/4-prestashop-account/'},
      {
        title: "PrestaShop Billing",
        path: "/5-prestashop-billing/1-overview/",
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
          "/5-prestashop-billing/4-how-tos/",
          {
            title: 'References',
            sidebarDepth: 0,
            collapsable: false,
            children: [
              '/5-prestashop-billing/5-references/1-webhook/',
              '/5-prestashop-billing/5-references/2-billing-api/',
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

const { description } = require('../../package');

module.exports = {
  title: 'PrestaShop Marketplace Guidelines',
  description: '',
  theme: '',
  head: [
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/assets/images/favicons/apple-touch-icon.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/assets/images/favicons/favicon-32x32.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/assets/images/favicons/favicon-16x16.png',
      },
    ],
    ['link', { rel: 'manifest', href: '/assets/images/favicons/site.webmanifest' }],
    [
      'link',
      { rel: 'mask-icon', href: '/assets/images/favicons/safari-pinned-tab.svg', color: '#3a0839' },
    ],
    ['link', { rel: 'shortcut icon', href: '/assets/images/favicons/favicon.ico' }],
    ['meta', { name: 'msapplication-TileColor', content: '#011638' }],
    [
      'meta',
      { name: 'msapplication-config', content: '/assets/images/favicons/browserconfig.xml' },
    ],
    ['meta', { name: 'theme-color', content: '#011638' }],

    // Google Tag Manager (GTM) Head Snippet
    [
      'script',
      {},
      `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-PRPNJXS4');
    `,
    ],

    // Axeptio Cookie Consent Snippet
    [
      'script',
      {},
      `
      window.axeptioSettings = {
        clientId: "68e52bec83b7c8abf20cbf50",
        cookiesVersion: "docs-fr-EU",
      };

      (function(d, s) {
        var t = d.getElementsByTagName(s)[0], e = d.createElement(s);
        e.async = true; e.src = "//static.axept.io/sdk.js";
        t.parentNode.insertBefore(e, t);
      })(document, "script");
    `,
    ],

    // GTM (noscript) - Placed in the head
    [
      'noscript',
      {},
      '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PRPNJXS4" height="0" width="0" style="display:none;visibility:hidden"></iframe>',
    ],
  ],

  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    displayAllHeaders: true,
    sidebarDepth: 1,
    activeHeaderLinks: false,

    // --- ADD THIS SECTION TO EXCLUDE FILES ---
    searchExclude: [
      '/guide/', // Excludes all files inside the /guide/ folder
      '/internal-billing-api/', // Excludes all files inside the /internal-billing-api/ folder
      '/config.js', // Excludes the specific config file if it's being indexed
      '/internal-billing-api/README.md', // Specific file exclusion
      '/9-prestashop-integration-framework/', //exclude all files of old content from search
    ],
    // ------------------------------------------

    // Logo is now correctly positioned in themeConfig
    logo: '/assets/images/common/logo-prestashop-w.CL9Kv5AS.svg',

    // Corrected NAV structure to properly display dropdown
    nav: [
      {
        text: 'PrestaShop Marketplace Guidelines', // This is the title you click to open the dropdown
        ariaLabel: 'Developer Resources Menu',
        items: [
          { text: 'Marketplace Guidelines Introduction', link: '/0-guidelines-introduction/' },
          { text: 'Getting started', link: '/1-getting-started/' },
          { text: 'Technical Development Standards', link: '/2-technical-development-standards/' },
          { text: 'Content & Marketing Standards', link: '/3-content-and-marketing-standards/' },
          {
            text: 'PrestaShop recommended Quality Standards',
            link: '/4-quality-standards-and-verified-plus/',
          },
          {
            text: 'Submission & Validation Process',
            link: '/5-submission-and-validation-process/',
          },
          { text: 'Post-Launch Management', link: '/6-post-launch-management/' },
          { text: 'Compliance & Legal Obligations', link: '/7-legal-and-compliance/' },
          { text: 'Useful Resources', link: '/8-other-resources/' },
        ],
      },
    ],

    // Sidebar with specific path configurations
    sidebar: {
      '/9-prestashop-integration-framework/': [
        {
          title: 'PrestaShop Integration Framework',
          collapsable: true, // Ensured this is true for collapsible functionality
          children: [
            '/9-prestashop-integration-framework/0-introduction/',
            '/9-prestashop-integration-framework/1-how-it-works/',
            '/9-prestashop-integration-framework/2-before-starting/',
            '/9-prestashop-integration-framework/3-preparing-your-environment/',
            '/9-prestashop-integration-framework/4-prestashop-account/',
            {
              title: 'PrestaShop Billing',
              // path is not required here, children link to it
              collapsable: true, // Make sure this nested section is collapsible
              children: [
                '/9-prestashop-integration-framework/5-prestashop-billing/1-overview/',
                '/9-prestashop-integration-framework/5-prestashop-billing/2-concepts/',
                '/9-prestashop-integration-framework/5-prestashop-billing/3-tutorial/',
                '/9-prestashop-integration-framework/5-prestashop-billing/100-hidden/1-checkout-subscription/',
                '/9-prestashop-integration-framework/5-prestashop-billing/100-hidden/2-address/',
                '/9-prestashop-integration-framework/5-prestashop-billing/100-hidden/3-payment-method/',
              ],
            },
            '/9-prestashop-integration-framework/7-prestashop-cloudsync/',
            '/9-prestashop-integration-framework/8-apis/',
            '/9-prestashop-integration-framework/9-submitting-your-module/',
            '/9-prestashop-integration-framework/10-validation-checklist/',
            '/9-prestashop-integration-framework/11-faq/',
            '/9-prestashop-integration-framework/12-legacy-account-and-billing/',
          ],
        },
      ],
      '/': [
        // Sidebar for all other pages (Marketplace Guidelines)
        { title: 'Marketplace Guidelines Introduction', path: '/0-guidelines-introduction/' },
        { title: 'Getting started', path: '/1-getting-started/' },
        { title: 'Technical Development Standards', path: '/2-technical-development-standards/' },
        { title: 'Content & Marketing Standards', path: '/3-content-and-marketing-standards/' },
        {
          title: 'PrestaShop recommended Quality Standards',
          path: '/4-quality-standards-and-verified-plus/',
        },
        { title: 'Submission & Validation Process', path: '/5-submission-and-validation-process/' },
        { title: 'Post-Launch Management', path: '/6-post-launch-management/' },
        { title: 'Compliance & Legal Obligations', path: '/7-legal-and-compliance/' },
        { title: 'Useful Resources', path: '/8-other-resources/' },
      ],
    },
  },

  plugins: [
    // 'code-switcher', // <-- Comment this out
    // [
    //   'vuepress-plugin-medium-zoom', // <-- Comment this out
    //   {
    //     delay: 200,
    //     options: {
    //       background: '#888888',
    //       margin: 24,
    //       scrollOffset: 0,
    //     },
    //   },
    // ],
  ],
};

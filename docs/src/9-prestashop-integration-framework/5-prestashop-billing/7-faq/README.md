---
title: FAQ
---

# FAQ

You can find frequently asked questions and their answers here.

**A Merchant is contacting me with a problem of CSP (Content Security Policy) and the PrestaShop Billing frontend component does not load. What can I tell them ?**

Here is an example:

![an image representing the CSP error in console](/assets/images/billing/csp-error-in-console-example.png)

Note that the PrestaShop Billing frontend component is a "Cross Domain Component", which means that it will be loaded in the merchant's browser as a secure Iframe referencing our domain `prestashop.net` (or `prestashop.com`).
You (or the merchant) may encounter some problems loading it if the shop where your PrestaShop module, integrating the PrestaShop Integration Framework, is installed is using [CSP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/Sources) in their HTTP response headers. Make sure `*.prestashop.net` and `*.prestashop.com` are added to these values by communicating these informations to the merchant installing your PrestaShop module that integrates the PrestaShop Integration Framework.

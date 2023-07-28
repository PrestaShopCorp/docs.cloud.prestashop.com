---
title: module-lib-billing
---

# module-lib-billing
[[toc]]

## Context

Modifiable properties may be modified via the use of the `present` method of the `ps_billings_facade`.

```php
$billingFacade->present([
    'logo' => $partnerLogo,
    'tosUrl' => 'https://yoururl/',
    'privacyUrl' => 'https://yoururl/',
]
```

| Property             | Type    | Description                                            | Modifiable |
|----------------------|---------|-------------------------------------------------------|------------|
| contextVersion       | number  | The version of the context                            | No         |
| billingenv           | string  | Denotes the current environment of prestashop billing | No         |
| issandbox            | boolean | Sandbox mode                                          | No         |
| i18n.isocode         | string  | The shop's language iso code                          | No         |
| refreshtoken         | string  | This token identifies the shop                        | No         |
| shop.uuid            | string  | The uuid of the shop                                  | No         |
| shop.domain          | string  | The domain of the shop, for example sub.domain.ltd    | No         |
| organization.uuid    | string  | The uuid of the organization                          | No         |
| organization.email   | string  | The email of the organization                         | No         |
| organization.logosrc | base64  | A base64 representation of the organization's logo    | Yes         |
| product.id           | string  | The technical name of the product                     | No         |
| product.displayname  | string  | The human readable product's name                     | No         |
| product.logosrc      | base64  | A base64 representation of the product's logo         | No         |
| product.privacyurl   | string  | A link to the privacy rules partaining to the product | Yes        |
| tosurl               | string  | A link to the tos partaining to the product           | Yes        |

## Changelog

:::tip
**Version `3.1.0`**

Introduces breaking changes to the context.

For modifiable properties: 
- `tosLink` becomes `tosUrl`.
- `privacyLink` becomes `privacyUrl`.
- `emailSupport` is removed.

If you used properties of the context for your implementation, you should check against the full table [below](#context) before updating to this new version.

Now:
```php{4-5}
// PrestaShop Billing
Media::addJsDef($billingFacade->present([
    'logo' => $partnerLogo,
    'tosUrl' => 'https://yoururl/',
    'privacyUrl' => 'https://yoururl/',
]));
```

Before:
```php{4-5}
// PrestaShop Billing
Media::addJsDef($billingFacade->present([
    'logo' => $partnerLogo,
    'tosLink' => 'https://yoururl/',
    'privacyLink' => 'https://yoururl/',
]));
```
See [the tutorial](../../3-tutorial/README.md#inject-the-prestashop-billing-context) to see the changes in context.
:::
---
title: PrestaShop Billing CDC
---

# PrestaShop Billing CDC

[[toc]]

## Technical documentation

The documentation for the Billing CDC is [available here](https://unpkg.com/@prestashopcorp/billing-cdc/dist/docs/index.html).

## psBilling.initialize()

Initialize the Ps Billing CDC (cross-domain component). For your convenience, `module-lib-billing` creates the required `context` object (see the [tutorial](../../3-tutorial/README.md#inject-the-prestashop-billing-context) for further reading on how it is implemented).

```typescript
function initialize(
  context: Context,
  domComponentSelector: string,
  domModalSelector: string,
  onEventHookCallback: (type: EVENT_HOOK_TYPE, data: unknown) => void,
  hideInvoiceList = true
);
```

- `context`: an object holding key informations about the shop and your module. For more information on all available properties, see [below](#context).

:::tip
  Modifiable properties may be modified via the use of the `present` method of the `ps_billings_facade` in `module-lib-billing`.
:::

```php
$billingFacade->present([
    'logo' => $partnerLogo,
    'tosLink' => 'https://yoururl/',
    'privacyLink' => 'https://yoururl/',
    // This field is deprecated, but must be provided to ensure backward compatibility
    'emailSupport' => ''
]);
```

- `billingSelector`: the DOM element on which Ps Billing will be attached.
- `modalSelector`: the DOM element on which the modals of Ps Billing will be attached.
- `callback`:
- `hideInvoiceList`: whether to hide or show the invoice list.

## Context

:::tip
Nested properties are noted with `.`
For example `organization.uuid` translates to `{ organization: { uuid: '' } }`
:::

| Property             | Type    | Description                                           | Modifiable |
| -------------------- | ------- | ----------------------------------------------------- | ---------- |
| contextVersion       | number  | The version of the context                            | No         |
| billingEnv           | string  | Denotes the current environment of prestashop billing | No         |
| isSandbox            | boolean | Sandbox mode                                          | No         |
| i18n.isoCode         | string  | The shop's language iso code                          | No         |
| accessToken          | string  | This token identifies the shop                        | No         |
| shop.uuid            | string  | The uuid of the shop                                  | No         |
| shop.domain          | string  | The domain of the shop, for example sub.domain.ltd    | No         |
| organization.uuid    | string  | The uuid of the organization                          | No         |
| organization.email   | string  | The email of the organization                         | No         |
| organization.logoSrc | base64  | A base64 representation of the organization's logo    | Yes        |
| product.id           | string  | The technical name of the product                     | No         |
| product.displayName  | string  | The human readable product's name                     | No         |
| product.logoSrc      | base64  | A base64 representation of the product's logo         | No         |
| product.privacyUrl   | string  | A link to the privacy rules partaining to the product | Yes        |
| product.tosUrl       | string  | A link to the tos partaining to the product           | Yes        |

## psBilling.overrideContext()

You may sometimes need to override the context, and for this, we are providing this method that helps you do just that.

```typescript
type NestedObject = {
  [key: string]: NestedObject | any;
};

function overrideContext(
  baseObject: NestedObject,
  propertyPath: string[],
  overrideValue: unknown
): NestedObject {
```

Example usage:

```js
const baseObject = {
  level1: {
    level2: {
      level3: {
        value: 42,
      },
    },
  },
};

const updatedObject = overrideProperty(
  baseObject,
  ["level1", "level2", "level3", "value"],
  99
);

console.log(updatedObject.level1.level2.level3.value); // 99
```

- `baseObject` A base context object of undefined depth.
- `propertyPath` An array of strings of undefined length, representing from left to right the property you want to override by accessing each preceding node in the object.
- `overrideValue` The value that will override the rightmost string in propertyPath.

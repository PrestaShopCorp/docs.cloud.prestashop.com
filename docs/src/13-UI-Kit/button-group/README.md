---
title: Button Group
---

# Migrating Button Group Components

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/button-group)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-buttongroup--default)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/56aa20-button-group)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/button-group/) used in the PrestaShop UIKit: 

```html
<div class="btn-group" role="group" aria-label="Basic example">
  <button type="button" class="btn btn-secondary">Left</button>
  <button type="button" class="btn btn-secondary">Middle</button>
  <button type="button" class="btn btn-secondary">Right</button>
</div>
```

## PUIK

### Basic Use

For any button group component that you use, replace the structure above with the following structure:

```html
<div class="puik-button-group" role="group" aria-label="Position selection">
  <button class="puik-button puik-button--primary puik-button--md" aria-label="Select left">
    Left
  </button>
  <button class="puik-button puik-button--tertiary puik-button--md" aria-label="Select middle">
    middle
  </button>
  <button class="puik-button puik-button--tertiary puik-button--md" aria-label="Select right">
    right
  </button>
</div>
```

:::tip Note
  For accessibility reason, you may have to add an `aria-label` to each element to better describe its purpose.

  Change the class of a button from `puik-button--tertiary` to `puik-button--primary` to make a button visually selected.
:::

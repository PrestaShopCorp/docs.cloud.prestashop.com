---
title: Badge
---

# Migrating Badge Components

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/badge)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-badge--default)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/862c81-status-badge)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/badge/) used in the PrestaShop UIKit:

```html
<span class="badge badge-secondary">
  Badge
</span>
```

## PUIK

### Basic Use

For any badge component that you use, replace the structure above with the following structure:

```html
<div class="puik-badge puik-badge--neutral">
  Badge
</div>
```

### Variants

The following badge variants are available:
  - `neutral`
  - `success`
  - `warning`
  - `info`
  - `danger`

To use any of these variants, add the `puik-badge--${variant}` class to the badge:

```html{1}
<div class="puik-badge puik-badge--${variant}">
  Badge
</div>
```

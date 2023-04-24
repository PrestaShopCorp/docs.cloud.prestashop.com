---
title: Badge
---

# Migrating the Badge Component

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

```html
<div class="puik-badge puik-badge--${variant}">
  Badge
</div>
```

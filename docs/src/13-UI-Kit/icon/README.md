---
title: Icon
---

# Migrating Icon Components

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/icon)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-icon--default)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/309a51-icons)

## PrestaShop UIKit

Original [bootstrap component](https://icons.getbootstrap.com/) used in the PrestaShop UIKit:

- Icon font:
  ```html
  <i class="bi bi-0-circle"></i>
  ```

- HTML:
  ```html
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-0-circle" viewBox="0 0 16 16">
    <path d="M7.988 12.158c-1.851 0-2.941-1.57-2.941-3.99V7.84c0-2.408 1.101-3.996 2.965-3.996 1.857 0 2.935 1.57 2.935 3.996v.328c0 2.408-1.101 3.99-2.959 3.99ZM8 4.951c-1.008 0-1. 629 1. 09-1.629 2.895v.31c0 1.81.627 2.895 1.629 2.895s1.623-1.09 1.623-2.895v-.31c0-1.8-.621-2.895-1.623-2.895Z" />
    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8Z" />
  </svg>
  ```

## PUIK

PUIK uses the **Material Icons font, rounded**. The icon list can be found [here](https://fonts.google.com/icons?icon.style=Rounded).

### Basic Use

```html
<span class="puik-icon material-icons-round" style="font-size: 20px;">${icon_name}</span>
```

:::tip Note
Any tag can be used as root element.
:::

#### Example

```html
<span class="puik-icon material-icons-round" style="font-size: 20px;">check</span>
<div class="puik-icon material-icons-round" style="font-size: 20px;">close</div>
```

### Size

The icon size can be changed by adding the corresponding CSS style to the root input:

```html
<span class="puik-icon material-icons-round" style="font-size: ${size};">check</span>
```

#### Example

```html
<span class="puik-icon material-icons-round" style="font-size: 20px;">check</span>
<span class="puik-icon material-icons-round" style="font-size: 22px;">check</span>
<span class="puik-icon material-icons-round" style="font-size: 24px;">check</span>
```

### Color

The icon color can be changed by adding the corresponding CSS style to the root element:

```html
<span class="puik-icon material-icons-round" style="font-size: 20px; color: ${color};">check</span>
```

#### Example

```html
<span class="puik-icon material-icons-round" style="font-size: 20px; color: green;">check</span>
<span class="puik-icon material-icons-round" style="font-size: 20px; color: rgb(90, 100, 255);">check</span>
<span class="puik-icon material-icons-round" style="font-size: 20px; color: #1D1B1B;">check</span>
```
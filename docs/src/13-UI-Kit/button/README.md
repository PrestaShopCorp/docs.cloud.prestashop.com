---
title: Button
---

# Migrating the Button Component

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/button)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-button--default)
<!-- - [Figma](https://www.figma.com/file/CUc5n1r2UIH30Tqec5DOvN/PrestaShop-Design-Kit?node-id=3633-20995&t=9EjJ88PaDg6dpkhT-0) -->
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/9052bc-buttons/b/27e71a)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/buttons/) used in the PrestaShop UIKit: 

```html
<button type="button" class="btn btn-primary">Primary</button>
```

## PUIK

### Basic Use

For any `button` component that you use, replace the structure above with the following structure:

```html
<button type="button" class="puik-button puik-button--primary puik-button--md">
  Click here
</button>
```

### Variants

The following button variants are available:
  - `primary`
  - `destructive`
  - `secondary`
  - `tertiary`
  - `text`
  - `info`
  - `success`
  - `warning`
  - `error`

To use any of these variants, add the `puik-button--${variant}` class to the button:

```html{1}
<button type="button" class="puik-button puik-button--${variant} puik-button--md">
  Click here
</button>
```

#### Example: Tertiary Button

Original structure from the PrestaShop UIKit:

```html
<button type="button" class="btn btn-tertiary">Tertiary</button>
```

New structure using PUIK:

```html
<button type="button" class="puik-button puik-button--tertiary puik-button--md">
  Tertiary button
</button>
```

### Size

Different sizes are available for each button:
- `sm` (small)
- `md` (medium)
- `lg` (large)

To use any of these sizes, add the `puik-button--${size}"` class to the button:

```html{1}
<button type="button" class="puik-button puik-button--primary puik-button--${size}">
  Button of ${size} size
</button>
```

#### Example: Small Button

```html
<button type="button" class="puik-button puik-button--primary puik-button--sm">
  Small button
</button>
```

### Width

By default, the button width will adapt to its contents. For the button to be as wide as possible, use the `puik-button--fluid` class:

```html
<button type="button" class="puik-button puik-button--primary puik-button--md puik-button--fluid">
  Fluid button
</button>
```

### Disabled

A button can be set as disabled by adding the `disabled` attribute and the `puik-button--disabled` class:

```html{1}
<button type="button" class="puik-button puik-button--primary puik-button--md puik-button--disabled" disabled>
  Disabled button
</button>
```

### Icons

You can add icons inside buttons, either on the left or on the right of the text.

The list of available icons can be found [here](https://www.figma.com/file/CUc5n1r2UIH30Tqec5DOvN/PrestaShop-Design-Kit?node-id=49-12965&t=nllH1z52Z4F1eE3k-0).

#### Icon on the left

```html
<button type="button" class="puik-button puik-button--primary puik-button--md">
  <div
   class="puik-icon material-icons-round puik-button__left-icon"
   style="font-size: 1.25rem;"
  >
    check
  </div>

  Click here
</button>
```
#### Icon on the right

```html
<button type="button" class="puik-button puik-button--primary puik-button--md">
  Click here

  <div
   class="puik-icon material-icons-round puik-button__right-icon"
   style="font-size: 1.25rem;"
  >
    check
  </div>
</button>
```

### Link

A button visual can also be added over a link. To do so, replace the `button` tag with an `a` tag:

```html
<a
  class="puik-button puik-button--primary puik-button--md"
  href="/"
>
    Lien
  </a>
```

:::tip Note
All the options seen above (variant, size, width, disabled) can also be applied in this case.
:::
---
title: Alert
---

# Migrating the Alert Component

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/alert)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-alert--default)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/818e69-alert-banner/b/28d7f7)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/alerts/) used in the PrestaShop UIKit:

```html
<div class="alert alert-primary" role="alert">
  This is a primary alert. Check it out!
</div>
```

## PUIK

### Basic Use

For any `alert` component that you use, replace the structure above with the following structure:

```html
<div
  class="puik-alert puik-alert--success"
  aria-live="polite"
>
  <div class="puik-alert__content">
    <div class="puik-icon material-icons-round puik-alert__icon" style="font-size: 1.25rem;">check_circle</div>
    <div class="puik-alert__text">
      <p class="puik-alert__title">Title</p>
      <span class="puik-alert__description">This is the description of the success alert.</span>
    </div>
  </div>
  <button class="puik-button puik-button--success puik-button--md puik-alert__button">Button</button>
</div>
```

### Variants

The following alert variants are available:
  - `success`
  - `warning`
  - `info`
  - `danger`

For each variant, you can use the structure shown above, and change the root `div` class to `puik-alert--${variant}`:

```html{2,12}
<div
  class="puik-alert puik-alert--${variant}"
  aria-live="polite"
>
  <div class="puik-alert__content">
    <div class="puik-icon material-icons-round puik-alert__icon" style="font-size: 1.25rem;">check_circle</div>
    <div class="puik-alert__text">
      <p class="puik-alert__title">Title</p>
      <span class="puik-alert__description">This is the description of the ${variant} alert.</span>
    </div>
  </div>
  <button class="puik-button puik-button--${variant} puik-button--md puik-alert__button">Button</button>
</div>
```

:::tip Note
The `aria-live="polite"` attribute is important. It allows you to specify the behavior users should follow when this alert appears. In the example shown above, the alert content vocalization will happen after the end any vocalization currently in progress.
:::

### Borders

You can remove borders from the `alert` component. To do so, add the `puik-alert--no-borders` class to the root `div`: 

```html{2}
<div
  class="puik-alert puik-alert--${variant} puik-alert--no-borders"
  aria-live="polite"
>
  <div class="puik-alert__content">
    <div class="puik-icon material-icons-round puik-alert__icon" style="font-size: 1.25rem;">check_circle</div>
    <div class="puik-alert__text">
      <p class="puik-alert__title">Title</p>
      <span class="puik-alert__description">This is the description of the ${variant} alert.</span>
    </div>
  </div>
  <button class="puik-button puik-button--${variant} puik-button--md puik-alert__button">Button</button>
</div>
```

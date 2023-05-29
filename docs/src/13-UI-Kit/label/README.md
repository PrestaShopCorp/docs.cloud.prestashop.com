---
title: Label
---

# Migrating Label Components

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/label)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-label--default)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/forms/) used in the PrestaShop UIKit:

```html
<div class="form-group">
    <label for="input">Email address</label>
</div>
```

## PUIK

### Basic Use

For any label component that you use, replace the structure above with the following structure:

```html
<label
  class="puik-label"
  for="input"
>
  My Label
</label>
```

:::tip Note
The attribute `for` is used to specify the ID of the input the label refers to.
:::

### Optional Input

To specify an input is optional, you can use the following structure:

```html
<label
  class="puik-label"
  for="input"
>
  My Label
  <span class="puik-label--optional">(Optional)</span>
</label>
```

### Required Input

To specify an input is required, you can use the following structure:

```html
<label
  class="puik-label"
  for="input"
>
  My Label
  <span class="puik-label--required">*</span>
</label>
```
---
title: Label
---

# Label Component Migration

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

```html
<label
  class="puik-label"
  for="input"
>
  My Label
</label>
```

:::tip Note
The attribute `for` is used to specify which input the label refers, it is the input's id.
:::

### Optionnal

You can add an optionnal text:

```html
<label
  class="puik-label"
  for="input"
>
  My Label
  <span class="puik-label--optional">(Optional)</span>
</label>
```

### Required

You can add a required text :

```html
<label
  class="puik-label"
  for="input"
>
  My Label
  <span class="puik-label--required">*</span>
</label>
```
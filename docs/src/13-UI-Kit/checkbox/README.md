---
title: Checkbox
---

# Checkbox Component Migration

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/checkbox)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-checkbox--default)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/295481-form/b/0132a8)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/forms/) used in the PrestaShop UIKit:

```html
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
  <label class="form-check-label" for="defaultCheck1">
    Default checkbox
  </label>
</div>
```

## PUIK

### Basic Use

For any checkbox component that you use, replace the structure above with the following structure:

```html
<div class="puik-checkbox">
  <input id="id" class="puik-checkbox__input" type="checkbox">
  <label for="id" class="puik-checkbox__label">Label</label>
</div>
```

### Checked

A checkbox can be set as checked by default by adding the `checked` attribute:

```html{2}
<div class="puik-checkbox">
  <input id="id" class="puik-checkbox__input" type="checkbox" checked>
  <label for="id" class="puik-checkbox__label">Label</label>
</div>
```

### Indeterminate

A checkbox can be set as indeterminate by default by adding the `indeterminate` attribute:

```html{2}
<div class="puik-checkbox">
  <input id="id" class="puik-checkbox__input" type="checkbox" indeterminate>
  <label for="id" class="puik-checkbox__label">Label</label>
</div>
```

### Disabled

A checkbox can be set as disabled by adding the `disabled` attribute:

```html{2}
<div class="puik-checkbox">
  <input id="id" class="puik-checkbox__input" type="checkbox" disabled>
  <label for="id" class="puik-checkbox__label">Label</label>
</div>
```

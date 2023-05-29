---
title: Switch
---

# Migrating Switch Components

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/switch)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-switch--default)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/5.1/forms/checks-radios/#switches) used in the PrestaShop UIKit:

```html
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div>
```

## PUIK

### Basic Use

For any switch component that you use, replace the structure above with the following structure:

```html
<div class="puik-switch__group">
  <label for="switch-id" id="label-id" class="puik-switch__label puik-switch__label--left">Label</label>
  <button class="puik-switch" id="switch-id" role="switch" type="button" aria-checked="false" aria-labelledby="label-id">
    <span class="puik-switch__toggle"></span>
  </button>
</div>
```

:::tip Note
For accessibility reasons, once clicked, `aria-checked` should set to `true`.
:::

### Disabled

A switch can be disabled by adding the `disabled` attribute to the button:

```html{3}
<div class="puik-switch__group">
  <label for="switch-id" id="label-id" class="puik-switch__label puik-switch__label--left">Label</label>
  <button class="puik-switch" disabled id="switch-id" role="switch" type="button" aria-checked="false" aria-labelledby="label-id">
    <span class="puik-switch__toggle"></span>
  </button>
</div>
```

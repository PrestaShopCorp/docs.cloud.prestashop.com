---
title: Radio
---

# Radio Component Migration

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/radio)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-radio--default)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/forms/#checkboxes-and-radios) used in the PrestaShop UIKit:

```html
<div class="form-check">
  <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
  <label class="form-check-label" for="exampleRadios1">
    Default radio
  </label>
</div>
```

## PUIK

### Basic Use

For single radio button components, replace the structure above with the following structure:

```html
<div class="puik-radio">
  <input
    id="radio"
    class="puik-radio__input"
    type="radio"
    name="radio"
    value="true"
  >
    <label for="radio" class="puik-radio__label">
      Label
    </label>
</div>
```

For multiple radio button components, replace the structure above with the following structure:

```html
<fieldset>
  <legend>
      This is the legend.
  <legend>

  <div class="puik-radio">
    <input
      id="radio-1"
      class="puik-radio__input"
      type="radio"
      name="radio"
      value="true"
    >
      <label for="radio-1" class="puik-radio__label">
        Label 1
      </label>
  </div>

  <div class="puik-radio">
    <input
      id="radio-2"
      class="puik-radio__input"
      type="radio"
      name="radio"
      value="true"
    >
      <label for="radio-2" class="puik-radio__label">
        Label 2
      </label>
  </div>
<fieldset>
```

### Checked

To set a radio button as checked, add the `checked` attribute:

```html{8}
<div class="puik-radio">
  <input
    id="radio"
    class="puik-radio__input"
    type="radio"
    name="radio"
    value="true"
    checked
  >
    <label for="radio" class="puik-radio__label">
      Label
    </label>
</div>
```

### Disabled

To set a radio button as disabled, add the `disabled` attribute:

```html{8}
<div class="puik-radio">
  <input
    id="radio"
    class="puik-radio__input"
    type="radio"
    name="radio"
    value="true"
    disabled
  >
    <label for="radio" class="puik-radio__label">
      Label
    </label>
</div>
```

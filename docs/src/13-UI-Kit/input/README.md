---
title: Input
---

# Migrating Input Components

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/input)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-input--default)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/forms/) used in the PrestaShop UIKit:

```html
<input class="form-control form-control-lg" type="text" placeholder="Placeholder">
```

## PUIK

### Basic Use

For any input component that you use, replace the structure above with the following structure:

```html
<div class="puik-input">
  <div class="puik-input__wrapper">
    <input id="id" class="puik-input__field" placeholder="Placeholder" type="text">
  </div>
</div>
```

### Parameters

You can use the usual attributes that can be found on an input tag (`placeholder`, `disabled`, `type`, `min`, `max`, `step`, etc.).

### Number Type

For a number input component, replace the structure above with the following structure:

```html
<div class="puik-input">
  <div class="puik-input__wrapper">
    <input class="puik-input__field" type="number">
    <div class="puik-input__controls">
      <button type="button" class="puik-input__controls__increment" aria-label="Increase">
        <span class="puik-input__controls__increment__icon">arrow_drop_up</span>
      </button>
      <button type="button" class="puik-input__controls__decrement" aria-label="Decrease">
        <span class="puik-input__controls__decrement__icon">arrow_drop_down</span>
      </button>
    </div>
  </div>
</div>
```

:::tip Note
The `aria-label="Increase"` and `aria-label="Decrease"` attributes are important, as they explain to the user what the buttons are for.
:::

### Variants

2 variants are available for the input component:

- `success`
- `error`

To use any of them, add the ` puik-input__wrapper--${variant}` class to the element that contains the `puik-input__wrapper` class:

```html{2}
<div class="puik-input">
  <div class="puik-input__wrapper puik-input__wrapper--${variant}">
    <input class="puik-input__field" type="text">
  </div>
</div>
```

#### Example of Success Variant

```html
<div class="puik-input">
  <div class="puik-input__wrapper puik-input__wrapper--success">
    <input class="puik-input__field" type="text">
  </div>
</div>
```

#### Example of Error Variant

```html
<div class="puik-input">
  <div class="puik-input__wrapper puik-input__wrapper--error">
    <input class="puik-input__field" type="text">
  </div>
</div>
```

### Disabled

For the input to have the disabled state, add the ` puik-input__wrapper--disabled` class to the element that contains the `puik-input__wrapper` class:

```html{2}
<div class="puik-input">
  <div class="puik-input__wrapper puik-input__wrapper--disabled">
    <input class="puik-input__field" disabled type="text">
  </div>
</div>
```

### Hint

You can add a description text under the input component:

```html
<div class="puik-input">
  <div class="puik-input__wrapper">
    <input class="puik-input__field" type="text">
  </div>
  <div class="puik-input__hint">
    <span class="puik-input__hint__text">This is a hint</span>
  </div>
</div>
```

### Append/Preppend

You can add contents inside the input component, on the left/right of where the text will be entered:

```html
<div class="puik-input">
  <div class="puik-input__wrapper">
    <div class="puik-input__prepend">$</div>
    <input class="puik-input__field" type="text">
    <div class="puik-input__append">kg</div>
  </div>
</div>
```

### Examples

#### Number Type, Disabled, Append, Prepend

```html
<div class="puik-input">
  <div class="puik-input__wrapper puik-input__wrapper--disabled">
    <div class="puik-input__prepend">$</div>
    <input class="puik-input__field" type="number" disabled>
    <div class="puik-input__append">kg</div>
    <div class="puik-input__controls">
      <button type="button" class="puik-input__controls__increment" aria-label="Increase">
        <span class="puik-input__controls__increment__icon">arrow_drop_up</span>
      </button>
      <button type="button" class="puik-input__controls__decrement" aria-label="Decrease">
        <span class="puik-input__controls__decrement__icon">arrow_drop_down</span>
      </button>
    </div>
  </div>
</div>
```

#### Password Type, Hint

```html
<div class="puik-input">
  <div class="puik-input__wrapper">
    <input id="id" class="puik-input__field" placeholder="Placeholder" type="password">
  </div>
  <div class="puik-input__hint">
    <span class="puik-input__hint__text">This is a hint</span>
  </div>
</div>
```

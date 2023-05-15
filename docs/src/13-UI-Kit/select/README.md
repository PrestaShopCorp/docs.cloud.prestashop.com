---
title: Select
---

# Migrating Select Components

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/select)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-select--default)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/66e0ac-dropdown/b/454f45)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/forms/#form-controls) used in the PrestaShop UIKit:

```html
<div class="form-group">
  <label for="exampleFormControlSelect1">Example select</label>
  <select class="form-control" id="exampleFormControlSelect1">
    <option>1</option>
    <option>2</option>
    <option>3</option>
    <option>4</option>
    <option>5</option>
  </select>
</div>
```

## PUIK

### Basic Use

For any select component that you use, replace the structure above with the following structure:

```html
<div class="puik-select">
  <div class="puik-select__wrapper">
    <button
      class="puik-select__button"
      aria-haspopup="listbox"
      aria-expanded="false"
    >
      <span class="puik-select__selected">
        Select a value
      </span>
      <span class="puik-icon puik-select__icon" aria-hidden="true"> unfold_more </span>
    </button>

    <div class="puik-select__options" role="listbox" style="display: none;">
      <ul class="puik-select__options-list">
        <li class="puik-option" role="option" aria-selected="false" tabindex="0">
          <span class="puik-option__label">Option 1</span>
        </li>
        <li class="puik-option" role="option" aria-selected="false" tabindex="0">
          <span class="puik-option__label">Option 2</span>
        </li>
        <li class="puik-option" role="option" aria-selected="false" tabindex="0">
          <span class="puik-option__label">Option 3</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

### Visible Menu

You can make the menu visible by:

- Removing the `style="display: none;"` style,
- Setting the `aria-expanded` attribute to `true`.

```html{6,14}
<div class="puik-select">
  <div class="puik-select__wrapper">
    <button
      class="puik-select__button"
      aria-haspopup="listbox"
      aria-expanded="true"
    >
      <span class="puik-select__selected">
        Select a value
      </span>
      <span class="puik-icon puik-select__icon" aria-hidden="true"> unfold_more </span>
    </button>

    <div class="puik-select__options" role="listbox">
      <ul class="puik-select__options-list">
        <li class="puik-option" role="option" aria-selected="false" tabindex="0">
          <span class="puik-option__label">Option 1</span>
        </li>
        <li class="puik-option" role="option" aria-selected="false" tabindex="0">
          <span class="puik-option__label">Option 2</span>
        </li>
        <li class="puik-option" role="option" aria-selected="false" tabindex="0">
          <span class="puik-option__label">Option 3</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

### Selected Value

You can set an option as selected by:
- Adding the `puik-option puik-option--selected` class to the `li` tag,
- Setting the `aria-selected` attribute to `true`,
- Setting the contents of the element with the `puik-select__selected` class to the value of the selected option,
- Adding an icon - *optional*.

```html{8,9,10,16,18-19}
<div class="puik-select">
  <div class="puik-select__wrapper">
    <button
      class="puik-select__button"
      aria-haspopup="listbox"
      aria-expanded="false"
    >
      <span class="puik-select__selected">
        Option 1
      </span>
      <span class="puik-icon puik-select__icon" aria-hidden="true"> unfold_more </span>
    </button>

    <div class="puik-select__options" role="listbox">
      <ul class="puik-select__options-list">
        <li class="puik-option puik-option puik-option--selected" aria-selected="true" role="option" tabindex="0">
          <span class="puik-option__label">Option 1</span>
          <span class="puik-icon puik-option__selected-icon">
            checked
          </span>
        </li>
        <li class="puik-option" aria-selected="false" role="option" tabindex="0">
          <span class="puik-option__label">Option 2</span>
        </li>
        <li class="puik-option" aria-selected="false" role="option" tabindex="0">
          <span class="puik-option__label">Option 3</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

### Disabled

A select can be set as disabled by adding the `disabled` class to the `button` tag:

```html{7}
<div class="puik-select">
  <div class="puik-select__wrapper">
    <button
      class="puik-select__button"
      aria-haspopup="listbox"
      aria-expanded="false"
      disabled
    >
      <span class="puik-select__selected">
        Select a value
      </span>
      <span class="puik-icon puik-select__icon" aria-hidden="true"> unfold_more </span>
    </button>

    <div class="puik-select__options" role="listbox" style="display: none;">
      <ul class="puik-select__options-list">
        <li class="puik-option" role="option" aria-selected="false" tabindex="0">
          <span class="puik-option__label">Option 1</span>
        </li>
        <li class="puik-option" role="option" aria-selected="false" tabindex="0">
          <span class="puik-option__label">Option 2</span>
        </li>
        <li class="puik-option" role="option" aria-selected="false" tabindex="0">
          <span class="puik-option__label">Option 3</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

### Disabled option

You can set one of the select options as disabled by:
- Adding the `puik-option--disabled` class to the `li` tag of the relevant option,
- Setting the `aria-disabled` attribute to `true` for the same `li` tag.

```html{22,25}
<div class="puik-select">
  <div class="puik-select__wrapper">
    <button
      class="puik-select__button"
      aria-haspopup="listbox"
      aria-expanded="false"
      disabled
    >
      <span class="puik-select__selected">
        Select a value
      </span>
      <span class="puik-icon puik-select__icon" aria-hidden="true"> unfold_more </span>
    </button>

    <div
      class="puik-select__options"
      tabindex="-1"
      role="listbox"
    >
      <ul class="puik-select__options-list">
        <li
          class="puik-option puik-option--disabled"
          role="option"
          aria-selected="false"
          aria-disabled="true"
          tabindex="0"
        >
          <span class="puik-option__label">Option 1</span>
        </li>
      </ul>
    </div>
  </div>
</div>
```

### Error

You can put the select in an error state by:
- Adding the `puik-select__button--error` class,
- Adding an error message and an icon.

```html{4,30-32}
<div class="puik-select">
  <div class="puik-select__wrapper">
    <button
      class="puik-select__button puik-select__button--error"
      aria-haspopup="listbox"
      aria-expanded="false"
    >
      <span class="puik-select__selected">
        Select a value
      </span>
      <span class="puik-icon puik-select__icon" aria-hidden="true"> unfold_more </span>
    </button>

    <div
      class="puik-select__options"
      tabindex="-1"
      role="listbox"
    >
      <ul class="puik-select__options-list">
        <li class="puik-option puik-option--disabled" role="option">
          <span class="puik-option__label">Action</span>
          <span class="puik-icon puik-option__selected-icon"> checked </span>
        </li>
        <li class="puik-option" role="option">
          <span class="puik-option__label">Another action</span>
          <span class="puik-icon puik-option__selected-icon"> checked </span>
        </li>
      </ul>
    </div>
    <div class="puik-select__error">
      <div class="puik-icon material-icons-round puik-select__error__icon" aria-hidden="false" style="font-size: 1.25rem;">error</div>
      <span class="puik-select__error__text">This is an error message</span>
    </div>
  </div>
</div>
```

---
title: Dropdown
---

# Migrating Dropdown Components

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/select)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-select--default)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/66e0ac-dropdown/b/454f45)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/dropdowns/) used in the PrestaShop UIKit:

```html
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Select a value
  </button>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item" href="#">Another action</a>
    <a class="dropdown-item" href="#">Something else here</a>
  </div>
</div>
```

## PUIK

### Basic Use

For any dropdown component that you use, replace the structure above with the following structure:

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
          <span class="puik-icon puik-select__icon"> unfold_more </span>
        </button>
        <div
          class="puik-select__options"
          tabindex="-1"
          role="listbox"
        >
          <ul class="puik-select__options-list">
            <li class="puik-option" role="option">
              <span class="puik-option__label">Action</span>
              <span class="puik-icon puik-option__selected-icon"> checked </span>
            </li>
            <li class="puik-option" role="option">
              <span class="puik-option__label">Another action</span>
              <span class="puik-icon puik-option__selected-icon"> checked </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
```

### Disabled

A dropdown can be set as disabled by adding the `disabled` class to the `button` tag:

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
          <span class="puik-icon puik-select__icon"> unfold_more </span>
        </button>
        <div
          class="puik-select__options"
          tabindex="-1"
          role="listbox"
        >
          <ul class="puik-select__options-list">
            <li class="puik-option" role="option">
              <span class="puik-option__label">Action</span>
              <span class="puik-icon puik-option__selected-icon"> checked </span>
            </li>
            <li class="puik-option" role="option">
              <span class="puik-option__label">Another action</span>
              <span class="puik-icon puik-option__selected-icon"> checked </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
```

### Disabled Option

To set one of the dropdown options as disabled, add the `puik-option--disabled` class to the `li` tag of the relevant option:

```html{20}
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
          <span class="puik-icon puik-select__icon"> unfold_more </span>
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
      </div>
    </div>
```
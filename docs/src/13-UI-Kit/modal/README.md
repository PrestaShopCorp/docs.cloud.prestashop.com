---
title: Modal
---

# Migrating Modal Components

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/modal)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-modal--default)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/57e3fc-modal/b/31f66d)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/modal/) used in the PrestaShop UIKit:

```html
<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
```

## PUIK

### Basic Use

For any modal component that you use, replace the structure above with the following structure:

```html
<div
  class="puik-modal puik-modal--dialog puik-modal--small puik-modal--invisible"
  role="dialog"
  aria-modal="true"
>
  <div class="puik-modal__dialogPanelContainer">
    <div id="headlessui-dialog-panel-12" class="puik-modal__dialogPanelContainer__dialogPanel">
      <header class="puik-modal__dialogPanelContainer__dialogPanel__header">
        <div class="puik-icon material-icons-round puik-modal__dialogPanelContainer__dialogPanel__header__icon" style="font-size: 24px;">home</div>
        <div class="puik-tooltip puik-modal__dialogPanelContainer__dialogPanel__header__title" tabindex="0">
          <div class="puik-tooltip__wrapper">
            <h2 class="title">Awesome title</h2>
          </div>
        </div>
      </header>

      <div class="puik-modal__dialogPanelContainer__dialogPanel__content">
        <!-- Your custom content here -->
      </div>

      <footer class="puik-modal__dialogPanelContainer__dialogPanel__footer">
        <button class="puik-button puik-button--secondary puik-button--md puik-modal__dialogPanelContainer__dialogPanel__footer__button--second">
          Awesome secondary button
        </button>
        <button class="puik-button puik-button--primary puik-button--md puik-modal__dialogPanelContainer__dialogPanel__footer__button--main">
          Awesome main button
        </button>
      </footer>
    </div>
  </div>
</div>
```

Remove the `puik-modal--invisible` class on the root element to make the modal appear, or add it to make the modal disappear.

:::tip Note
You have to manually move the focus into the modal. Also remember that the focus must remain inside the modal while opened.
:::

### Variants

The following modal variants are available:
  - `destructive`
  - `feedback`
  - `dialog`

To use any of these variants, add the `puik-modal--${variant}` class to the root `div`:

```html{2}
<div
  class="puik-modal puik-modal--${variant} puik-modal--small"
  role="dialog"
  aria-modal="true"
>
  <div class="puik-modal__dialogPanelContainer">
    <div id="headlessui-dialog-panel-12" class="puik-modal__dialogPanelContainer__dialogPanel">
      <header class="puik-modal__dialogPanelContainer__dialogPanel__header">
        <div class="puik-icon material-icons-round puik-modal__dialogPanelContainer__dialogPanel__header__icon" style="font-size: 24px;">home</div>
        <div class="puik-tooltip puik-modal__dialogPanelContainer__dialogPanel__header__title" tabindex="0">
          <div class="puik-tooltip__wrapper">
            <h2 class="title">Awesome title</h2>
          </div>
        </div>
      </header>

      <div class="puik-modal__dialogPanelContainer__dialogPanel__content">
        <!-- Your custom content here -->
      </div>

      <footer class="puik-modal__dialogPanelContainer__dialogPanel__footer">
        <button class="puik-button puik-button--secondary puik-button--md puik-modal__dialogPanelContainer__dialogPanel__footer__button--second">
          Awesome secondary button
        </button>
        <button class="puik-button puik-button--primary puik-button--md puik-modal__dialogPanelContainer__dialogPanel__footer__button--main">
          Awesome main button
        </button>
      </footer>
    </div>
  </div>
</div>
```

### Sizes

The following modal sizes are available:
  - `small`
  - `medium`
  - `large`

To use any of these sizes, add the `puik-modal--${size}` class to the root `div`:

```html{2}
<div
  class="puik-modal puik-modal--dialog puik-modal--${size}"
  role="dialog"
  aria-modal="true"
>
  <div class="puik-modal__dialogPanelContainer">
    <div id="headlessui-dialog-panel-12" class="puik-modal__dialogPanelContainer__dialogPanel">
      <header class="puik-modal__dialogPanelContainer__dialogPanel__header">
        <div class="puik-icon material-icons-round puik-modal__dialogPanelContainer__dialogPanel__header__icon" style="font-size: 24px;">home</div>
        <div class="puik-tooltip puik-modal__dialogPanelContainer__dialogPanel__header__title" tabindex="0">
          <div class="puik-tooltip__wrapper">
            <h2 class="title">Awesome title</h2>
          </div>
        </div>
      </header>

      <div class="puik-modal__dialogPanelContainer__dialogPanel__content">
        <!-- Your custom content here -->
      </div>

      <footer class="puik-modal__dialogPanelContainer__dialogPanel__footer">
        <button class="puik-button puik-button--secondary puik-button--md puik-modal__dialogPanelContainer__dialogPanel__footer__button--second">
          Awesome secondary button
        </button>
        <button class="puik-button puik-button--primary puik-button--md puik-modal__dialogPanelContainer__dialogPanel__footer__button--main">
          Awesome main button
        </button>
      </footer>
    </div>
  </div>
</div>
```

### Side Button

You can add a side button in the footer to allow an additionnal action:

```html{28,29,30,31}
<div
  class="puik-modal puik-modal--dialog puik-modal--${size}"
  role="dialog"
  aria-modal="true"
>
  <div class="puik-modal__dialogPanelContainer">
    <div id="headlessui-dialog-panel-12" class="puik-modal__dialogPanelContainer__dialogPanel">
      <header class="puik-modal__dialogPanelContainer__dialogPanel__header">
        <div class="puik-icon material-icons-round puik-modal__dialogPanelContainer__dialogPanel__header__icon" style="font-size: 24px;">home</div>
        <div class="puik-tooltip puik-modal__dialogPanelContainer__dialogPanel__header__title" tabindex="0">
          <div class="puik-tooltip__wrapper">
            <h2 class="title">Awesome title</h2>
          </div>
        </div>
      </header>

      <div class="puik-modal__dialogPanelContainer__dialogPanel__content">
        <!-- Your custom content here -->
      </div>

      <footer class="puik-modal__dialogPanelContainer__dialogPanel__footer">
        <button class="puik-button puik-button--secondary puik-button--md puik-modal__dialogPanelContainer__dialogPanel__footer__button--second">
          Awesome secondary button
        </button>
        <button class="puik-button puik-button--primary puik-button--md puik-modal__dialogPanelContainer__dialogPanel__footer__button--main">
          Awesome main button
        </button>
        <span class="puik-modal__dialogPanelContainer__dialogPanel__footer__spacer"></span>
        <button class="puik-button puik-button--text puik-button--md puik-modal__dialogPanelContainer__dialogPanel__footer__button--side">
          Awesome side button
        </button>
      </footer>
    </div>
  </div>
</div>
```

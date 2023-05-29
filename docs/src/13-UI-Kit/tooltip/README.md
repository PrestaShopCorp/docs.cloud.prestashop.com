---
title: Tooltip
---

# Migrating Tooltip Components

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/tooltip)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-tooltip--default)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/65b8a0-tooltip/b/87b096)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/tooltips/) used in the PrestaShop UIKit:

```html
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
  Tooltip on top
</button>
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="right" title="Tooltip on right">
  Tooltip on right
</button>
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">
  Tooltip on bottom
</button>
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="left" title="Tooltip on left">
  Tooltip on left
</button>
```

## PUIK

### Basic Use

For any tooltip component that you use, replace the structure above with the following structure:

```html
<div class="puik-tooltip__wrapper">
  <div class="puik-icon material-icons-round" style="font-size: 1.25rem;">help_outline</div>
</div>

<div
  class="puik-tooltip__tip"
  role="tooltip"
  style="
    z-index: 1000;
    position: absolute;
    inset: auto auto 0px 0px;
    margin: 0px;
    transform: translate(425px, -403px);
    display: none;
  "
  data-popper-placement="top"
>
  <div class="puik-tooltip__tip__content">
    <span class="puik-tooltip__tip__content__title">Title</span>
    <span class="puik-tooltip__tip__content__description">This is a tooltip</span>
  </div>

  <div
    class="puik-tooltip__tip__arrow"
    style="position: absolute; left: 0px; transform: translate(52px, 0px);"
  ></div>
</div>
```

### Visible

To make the tooltip visible, remove the `display: none;` style:

```html{14}
<div class="puik-tooltip__wrapper">
  <div class="puik-icon material-icons-round" style="font-size: 1.25rem;">help_outline</div>
</div>

<div
  class="puik-tooltip__tip"
  role="tooltip"
  style="
    z-index: 1000;
    position: absolute;
    inset: auto auto 0px 0px;
    margin: 0px;
    transform: translate(425px, -403px);
    display: none;
  "
  data-popper-placement="top"
>
  <div class="puik-tooltip__tip__content">
    <span class="puik-tooltip__tip__content__title">Title</span>
    <span class="puik-tooltip__tip__content__description">This is a tooltip</span>
  </div>

  <div
    class="puik-tooltip__tip__arrow"
    style="position: absolute; left: 0px; transform: translate(52px, 0px);"
  ></div>
</div>
```

### Position

To place the tooltip:

- Set its x and y positions,
- Set the tooltip arrow position.

```html{13,27}
<div class="puik-tooltip__wrapper">
  <div class="puik-icon material-icons-round" style="font-size: 1.25rem;">help_outline</div>
</div>

<div
  class="puik-tooltip__tip"
  role="tooltip"
  style="
    z-index: 1000;
    position: absolute;
    inset: auto auto 0px 0px;
    margin: 0px;
    transform: translate(${XPosition}, ${YPosition});
    display: none;
  "
>
  <div class="puik-tooltip__tip__content">
    <span class="puik-tooltip__tip__content__title">Title</span>
    <span class="puik-tooltip__tip__content__description">This is a tooltip</span>
  </div>

  <div
    class="puik-tooltip__tip__arrow"
    style="
      position: absolute;
      left: 0px;
      transform: translate(52px, 0px);
    "
  ></div>
</div>
```


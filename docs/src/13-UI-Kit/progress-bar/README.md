---
title: Progress Bar
---

# Migrating the Progress Bar Component

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/progress-bar)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-progressbar--default)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/progress/) used in the PrestaShop UIKit:

```html
<div class="progress">
  <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 75%" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div>
<div class="progress">
  <div class="progress-bar" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
</div>
```

## PUIK

### Basic Use

For any progress bar component that you use, replace the structure above with the following structure:

```html
<div class="progress-bar__container">
  <div class="progress-bar__content" style="width: 50%;"></div>
</div>
```

### Percentage

You can set the progression by changing the width of the progress bar using the `progress-bar__content` class:


```html
<div class="progress-bar__container">
  <div class="progress-bar__content" style="width: 0%;"></div>
</div>

<div class="progress-bar__container">
  <div class="progress-bar__content" style="width: 25%;"></div>
</div>

<div class="progress-bar__container">
  <div class="progress-bar__content" style="width: 50%;"></div>
</div>

<div class="progress-bar__container">
  <div class="progress-bar__content" style="width: 100%;"></div>
</div>
```

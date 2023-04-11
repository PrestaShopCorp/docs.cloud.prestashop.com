---
title: Card
---

# Card Component Migration

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/card)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-card--default)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/card/) used in the PrestaShop UIKit:

```html
<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>
```

## PUIK

### Basic Use

For any card component that you use, replace the structure above with the following structure:

```html
<div class="puik-card">
  <h3 class="puik-h3">Card title</h3>
  Card content
</div>
```

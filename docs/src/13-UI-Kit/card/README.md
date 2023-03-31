---
title: Alert
---

# Migration du composant alert

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/card)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-card--default)
- [Figma](https://www.figma.com/file/CUc5n1r2UIH30Tqec5DOvN/PrestaShop-Design-Kit?node-id=2565-15829&t=5pJry8GttTJVSJfC-0)
<!-- - [Zeroheight]() -->

## Bootstrap

Composant [bootstrap](https://getbootstrap.com/docs/4.0/components/card/) :

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

## Puik

### Utilisation basique

<br>

```html
<div class="puik-card">
  <h3 class="puik-h3">Card title</h3>
  Card content
</div>
```

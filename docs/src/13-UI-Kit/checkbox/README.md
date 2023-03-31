---
title: Checkbox
---

# Migration du composant Checkbox

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/checkbox)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-checkbox--default)
- [Figma](https://www.figma.com/file/CUc5n1r2UIH30Tqec5DOvN/PrestaShop-Design-Kit?node-id=1837-12485&t=5pJry8GttTJVSJfC-0)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/295481-form/b/0132a8)

## Bootstrap

Composant [bootstrap](https://getbootstrap.com/docs/4.0/components/forms/) :

```html
<div class="form-check">
  <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
  <label class="form-check-label" for="defaultCheck1">
    Default checkbox
  </label>
</div>
```

## Puik

### Utilisation basique

<br>

```html
<div class="puik-checkbox">
  <input id="id" class="puik-checkbox__input" type="checkbox">
  <label for="id" class="puik-checkbox__label">Label</label>
</div>
```

### Checked

```html
<div class="puik-checkbox">
  <input id="id" class="puik-checkbox__input" type="checkbox" checked>
  <label for="id" class="puik-checkbox__label">Label</label>
</div>
```

### Indeterminate

```html
<div class="puik-checkbox">
  <input id="id" class="puik-checkbox__input" type="checkbox" indeterminate>
  <label for="id" class="puik-checkbox__label">Label</label>
</div>
```

### Disabled

```html
<div class="puik-checkbox">
  <input id="id" class="puik-checkbox__input" type="checkbox" disabled>
  <label for="id" class="puik-checkbox__label">Label</label>
</div>
```

---
title: Input
---

# Migration du composant input

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/input)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-input--default)
- [Figma](https://www.figma.com/file/CUc5n1r2UIH30Tqec5DOvN/PrestaShop-Design-Kit?node-id=46-8792&t=5pJry8GttTJVSJfC-0)
<!-- - [Zeroheight](https://zeroheight.com/47c0ab1be/p/818e69-alert-banner/b/28d7f7) -->

## Bootstrap

Composant [bootstrap](https://getbootstrap.com/docs/4.0/components/forms/) :

```html
<input class="form-control form-control-lg" type="text" placeholder="Placeholder">
```

## Puik

### Utilisation basique

<br>

```html
<div class="puik-input">
  <div class="puik-input__wrapper">
    <input id="id" class="puik-input__field" placeholder="Placeholder" type="text">
  </div>
</div>
```

### Paramètres

Il est possible d'utiliser les attributs standards que l'on retrouve habituellement sur une balise input (placeholder, disabled, type, min, max, step, etc.).

### Type number

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

Remarque: Les attributs `aria-label="Increase"` et `aria-label="Decrease"` sont importants car ils permettent de décrire la fonction du bouton aux utilisateurs de lecteur d'écran.

### Variants

Il existe 2 variants pour le composant input :

- `success`
- `error`

Pour l'utiliser, il faut ajouter la classe ` puik-input__wrapper--${variant}` sur l'élément qui porte la classe `puik-input__wrapper`:

```html
<div class="puik-input">
  <div class="puik-input__wrapper puik-input__wrapper--${variant}">
    <input class="puik-input__field" type="text">
  </div>
</div>
```

#### Sucess

```html
<div class="puik-input">
  <div class="puik-input__wrapper puik-input__wrapper--success">
    <input class="puik-input__field" type="text">
  </div>
</div>
```

#### Error

```html
<div class="puik-input">
  <div class="puik-input__wrapper puik-input__wrapper--error">
    <input class="puik-input__field" type="text">
  </div>
</div>
```

### Disabled

Pour passer l'input en état disabled, il faut ajouter la classe ` puik-input__wrapper--disabled` sur l'élément qui porte la classe `puik-input__wrapper`:

```html
<div class="puik-input">
  <div class="puik-input__wrapper puik-input__wrapper--disabled">
    <input class="puik-input__field" disabled type="text">
  </div>
</div>
```

### Hint
Il est possible d'ajouter un texte de description sous l'input :

```html
<div class="puik-input">
  <div class="puik-input__wrapper">
    <input class="puik-input__field" type="text">
  </div>
  <div class="puik-input__hint">
    <span class="puik-input__hint__text">This is an hint</span>
  </div>
</div>
```

### Append/preppend

Il est possible d'ajouter du contenu avant et après le texte contenu dans l'input :

```html
<div class="puik-input">
  <div class="puik-input__wrapper">
    <div class="puik-input__prepend">$</div>
    <input class="puik-input__field" type="text">
    <div class="puik-input__append">kg</div>
  </div>
</div>
```

### Exemples

#### Type number, disabled, append, prepend

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

#### Type password, hint

```html
<div class="puik-input">
  <div class="puik-input__wrapper">
    <input id="id" class="puik-input__field" placeholder="Placeholder" type="password">
  </div>
  <div class="puik-input__hint">
    <span class="puik-input__hint__text">This is an hint</span>
  </div>
</div>
```

---
title: Alert
---

# Migration du composant alert

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/alert)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-alert--default)
- [Figma](https://www.figma.com/file/CUc5n1r2UIH30Tqec5DOvN/PrestaShop-Design-Kit?node-id=3633-19061&t=u3AkIIfijk9Lr8dE-0)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/818e69-alert-banner/b/28d7f7)

## Bootstrap

Composant [bootstrap](https://getbootstrap.com/docs/4.0/components/alerts/) :

```html
<div class="alert alert-primary" role="alert">
  This is a primary alert—check it out!
</div>
```

## Puik

### Utilisation basique

<br>

```html
<div
  class="puik-alert puik-alert--success"
  aria-live="polite"
>
  <div class="puik-alert__content">
    <div class="puik-icon material-icons-round puik-alert__icon" style="font-size: 1.25rem;">check_circle</div>
    <div class="puik-alert__text">
      <p class="puik-alert__title">Title</p>
      <span class="puik-alert__description">This is the description of the success alert.</span>
    </div>
  </div>
  <button class="puik-button puik-button--success puik-button--md puik-alert__button">Button</button>
</div>
```

### Variants

Il existe plusieurs variants :
  - `success`
  - `warning`
  - `info`
  - `danger`

Pour chaque variant, il suffit de reprendre la structure montrée précédement et de changer la classe sur la div racine : `puik-alert--${variant}` :

```html
<div
  class="puik-alert puik-alert--${variant}"
  aria-live="polite"
>
  <div class="puik-alert__content">
    <div class="puik-icon material-icons-round puik-alert__icon" style="font-size: 1.25rem;">check_circle</div>
    <div class="puik-alert__text">
      <p class="puik-alert__title">Title</p>
      <span class="puik-alert__description">This is the description of the success alert.</span>
    </div>
  </div>
  <button class="puik-button puik-button--success puik-button--md puik-alert__button">Button</button>
</div>
```

Remarque : l'attribut `aria-live="polite"` est important, il permet d'indiquer aux lecteurs d'écran le comportement à suivre quand cette alerte apparaît. Dans le cas présent, la vocalisation du contenu de l'alerte se fera après la fin de la vocalisation qui serait déjà en cours.

#### Bordures

Il est possible de supprimer les bordures sur le composant alerte, pour cela, il suffit d'ajouter la classe `puik-alert--no-borders` sur la div racine : 

```html
<div
  class="puik-alert puik-alert--${variant} puik-alert--no-borders"
  aria-live="polite"
>
  <div class="puik-alert__content">
    <div class="puik-icon material-icons-round puik-alert__icon" style="font-size: 1.25rem;">check_circle</div>
    <div class="puik-alert__text">
      <p class="puik-alert__title">Title</p>
      <span class="puik-alert__description">This is the description of the success alert.</span>
    </div>
  </div>
  <button class="puik-button puik-button--success puik-button--md puik-alert__button">Button</button>
</div>
```

---
title: Bouton
---

# Migration du composant bouton

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/button)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-button--default)
- [Figma](https://www.figma.com/file/CUc5n1r2UIH30Tqec5DOvN/PrestaShop-Design-Kit?node-id=3633-20995&t=9EjJ88PaDg6dpkhT-0)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/9052bc-buttons/b/27e71a)

## Bootstrap

Composant [bootstrap](https://getbootstrap.com/docs/4.0/components/buttons/) : 

```html
<button type="button" class="btn btn-primary">Primary</button>
```

## Puik

### Utilisation basique

<br>

```html
<button type="button" class="puik-button puik-button--primary puik-button--md">
  Click
</button>
```

### Variants

Il existe plusieurs variants de bouton :
  - `primary`
  - `destructive`
  - `secondary`
  - `tertiary`
  - `text`
  - `info`
  - `success`
  - `warning`
  - `error`

Pour chaque variant, il suffit d'ajouter sur le bouton la classe `puik-button--${variant}` :

```html
<button type="button" class="puik-button puik-button--${variant} puik-button--md">
  Click
</button>
```

#### Exemples

##### tertiary :

On passe donc d'un bouton de l'uikit v1 :

```html
<button type="button" class="btn btn-tertiary">Tertiary</button>
```

à un bouton utilisant Puik :

```html
<button type="button" class="puik-button puik-button--tertiary puik-button--md">
  Tertiary button
</button>
```

##### text :

```html
<button type="button" class="puik-button puik-button--text puik-button--md">
  Text button
</button>
```

### Tailles

Chaque bouton existe également en différentes tailles :
- `sm`
- `md`
- `lg`

Pour chaque taille, il suffit d'ajouter la classe `puik-button--${taille}"` :

```html
<button type="button" class="puik-button puik-button--primary puik-button--${taille}">
  Text button
</button>
```

#### Exemples

##### sm :

```html
<button type="button" class="puik-button puik-button--primary puik-button--sm">
  sm button
</button>
```

##### lg :

```html
<button type="button" class="puik-button puik-button--primary puik-button--lg">
  lg button
</button>
```

### Largeur

Par défaut, la largeur du bouton s'adaptera à son contenu, il est possible d'ajouter la classe `puik-button--fluid` pour que le bouton prenne toute la largeur disponible :

```html
<button type="button" class="puik-button puik-button--primary puik-button--md puik-button--fluid">
  Fluid button
</button>
```

### Disabled

Un bouton peut être mis en état désactivé en ajoutant l'attribut `disabled` et la classe `puik-button--disabled` :

```html
<button type="button" class="puik-button puik-button--primary puik-button--md puik-button--disabled" disabled>
  Disabled button
</button>
```

### Icons

Il est possible d'ajouter des icons à l'intérieur des boutons, que ce soit à droite ou à gauche du texte qu'il contient.

La liste des icons est disponible sur cette page [Figma](https://www.figma.com/file/CUc5n1r2UIH30Tqec5DOvN/PrestaShop-Design-Kit?node-id=49-12965&t=nllH1z52Z4F1eE3k-0)

#### Icon à gauche :

```html
<button type="button" class="puik-button puik-button--primary puik-button--md">
  <div
   class="puik-icon material-icons-round puik-button__left-icon"
   style="font-size: 1.25rem;"
  >
    check
  </div>

  Click
</button>
```
#### Icon à droite :

```html
<button type="button" class="puik-button puik-button--primary puik-button--md">
  Click

  <div
   class="puik-icon material-icons-round puik-button__right-icon"
   style="font-size: 1.25rem;"
  >
    check
  </div>
</button>
```

### Liens

Le visuel d'un bouton peut également être appliqué sur un lien, il suffit simplement de remplacer la balise `button` par une balise `a` :

```html
<a
  class="puik-button puik-button--primary puik-button--md"
  href="/"
>
    Lien
  </a>
```

Toutes les classe vues options (variant, taille, désactivé, largeur) sont également applicables.

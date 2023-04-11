---
title: Link
---

# Link Component Migration

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/link)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-link--default)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/5.0/helpers/colored-links/) used in the PrestaShop UIKit:

```html
<a href="#" class="link-primary">Primary link</a>
```

## PUIK

### Basic Use

```html
<a
  href="#"
  target="_self"
  title="I'm a tooltip for your link"
  class="puik-link puik-link--md"
>
  I'm a cool link
</a>
```

### Size

The link has different size :
  - `sm` (small)
  - `md` (medium)
  - `lg` (large)

For each size, you can add to the root element the class `puik-alert--${size}`:

```html{5}
<a
  href="#"
  target="_self"
  title="I'm a tooltip for your link"
  class="puik-link puik-link--${size}"
>
  I'm a cool link
</a>
```

### Target

Target attribute define where the href will be displayed. Possible values :
  - `_self`
  - `_blank`
  - `_parent`
  - `_top`

:::tip Note :
For more information about target destination, see the [documentation](https://developer.mozilla.org/fr/docs/Web/HTML/Element/a)
:::

### Title

The title provide a tooltip on hover

:::tip Note
L'interprétation de l'attribut `title` par les lecteurs d'écran peut varier selon le lecteur d'écran et la configuration de celui-ci.

Si l'attribut `title` apporte une information supplémentaire par rapport au contenu de la balise `a`, il est alors préférable d'ajouter un aria-label qui porte l'intégralité des informations donnés dans la balise et dans le titre afin d'en garantir la restitution complète.

```html
<!--Mauvais exemple, l'attribut `title` porte une information qui est potentiellement non vocalisée par les lecteurs d'écran-->
<a
  href="#"
  title="Visiter la page anglaise"
  class="puik-link puik-link--md"
>
  Visiter la page
</a>

<!--Bon exemple, l'attribut `title` porte une information qui est potentiellement non vocalisée par les lecteurs d'écran mais restituée grâce à l'attribut aria-label-->
<a
  href="#"
  title="Visiter la page anglaise"
  aria-label="Visiter la page anglaise"
  class="puik-link puik-link--md"
>
  Visiter la page
</a>
```
:::
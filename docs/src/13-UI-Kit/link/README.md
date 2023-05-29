---
title: Link
---

# Migrating Link Components

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

For any link component that you use, replace the structure above with the following structure:

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

Different sizes are available for each link:
  - `sm` (small)
  - `md` (medium)
  - `lg` (large)

To use any of these sizes, add the `puik-alert--${size}` class to the root element:

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

The target attribute defines where the href will be displayed. The following values are available:
  - `_self`
  - `_blank`
  - `_parent`
  - `_top`

:::tip Note
For more information about target destinations, see the [documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
:::

### Title

The title provides a tooltip on hover.

:::tip Note
The way the `title` attribute is interpreted by screen readers may vary depending on its type and configuration.

While the `title` attribute adds extra information to the `a` tag contents, you should still add an `aria-label` attribute including all the information from the tag and the title to make sure everything is vocalized.

- What you should **not** do:

  The `title` attribute includes information that may not be vocalized by screen readers:

  ```html
  <a
    href="#"
    title="Go to the English page"
    class="puik-link puik-link--md"
  >
    Go to the page
  </a>
  ```

- What you should do:

  The `title` attribute includes information that may not be vocalized by screen readers, but the `aria-label` attribute will ensure it is:
  
  ```html
  <a
    href="#"
    title="Go to the English page"
    aria-label="Go to the English page"
    class="puik-link puik-link--md"
  >
    Go to the page
  </a>
  ```
:::
---
title: Accordion
---

# Migrating the Accordion Component

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/accordion)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-accordion--default)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/17ec05-accordion/b/5951dd)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/collapse/#accordion-example/) used in the PrestaShop UIKit:

```html
<div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </button>
      </h5>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>
```

## PUIK

### Basic Use

For any accordion component that you use, replace the structure above with the following structures.

By default, an accordion is collapsed, and will look like this:

```html
<div class="puik-accordion-group">
  <div class="puik-accordion">
    <button aria-expanded="false" aria-controls="accordion-id" class="puik-accordion__header">
      <div class="puik-accordion__header__content">
        <div class="puik-accordion__header__content__title">Accordion title</div>
      </div>
      <div class="puik-icon material-icons-round puik-accordion__header__expand__icon" style="font-size: 24px;">keyboard_arrow_down</div>
    </button>
    <div id="accordion-id" class="puik-accordion__content"> Content 1 </div>
  </div>
</div>
```

To make an accordion expanded, add the `puik-accordion--expanded` class:

```html{2,3}
<div class="puik-accordion-group">
  <div class="puik-accordion puik-accordion--expanded">
    <button aria-expanded="true" aria-controls="accordion-id" class="puik-accordion__header">
      <div class="puik-accordion__header__content">
        <div class="puik-accordion__header__content__title">Accordion title</div>
      </div>
      <div class="puik-icon material-icons-round puik-accordion__header__expand__icon" style="font-size: 24px;">keyboard_arrow_down</div>
    </button>
    <div id="accordion-id" class="puik-accordion__content"> Accordion content </div>
  </div>
</div>
```
:::tip Accessibility
For accessibility reasons, you must set the `aria-expanded` attribute to `true` when the accordion is expanded, and to `false` when it is collapsed.
:::

### Multiple Accordions

You can add multiple accordions inside the wrapper with the `puik-accordion-group` class:

```html
<div class="puik-accordion-group">
  <div class="puik-accordion">
    <button aria-expanded="false" aria-controls="accordion-id-1" class="puik-accordion__header">
      <div class="puik-accordion__header__content">
        <div class="puik-accordion__header__content__title">Title 1</div>
      </div>
      <div class="puik-icon material-icons-round puik-accordion__header__expand__icon" style="font-size: 24px;">keyboard_arrow_down</div>
    </button>
    <div id="accordion-id-1" class="puik-accordion__content"> Content 1 </div>
  </div>
  <div class="puik-accordion">
    <button aria-expanded="false" aria-controls="accordion-id-2" class="puik-accordion__header">
      <div class="puik-accordion__header__content">
        <div class="puik-accordion__header__content__title">Title 2</div>
      </div>
      <div class="puik-icon material-icons-round puik-accordion__header__expand__icon" style="font-size: 24px;">keyboard_arrow_down</div>
    </button>
    <div id="accordion-id-2" class="puik-accordion__content"> Content 2 </div>
  </div>
  <div class="puik-accordion">
    <button aria-expanded="false" aria-controls="accordion-id-3" class="puik-accordion__header">
      <div class="puik-accordion__header__content">
        <div class="puik-accordion__header__content__title">Title 3</div>
      </div>
      <div class="puik-icon material-icons-round puik-accordion__header__expand__icon" style="font-size: 24px;">keyboard_arrow_down</div>
    </button>
    <div id="accordion-id-3" class="puik-accordion__content"> Content 3 </div>
  </div>
</div>
```

### Contained

Multiple accordions grouped together have spacing. You can remove that spacing by adding the `puik-accordion-group--contained` class to the wrapper:

```html{1}
<div class="puik-accordion-group puik-accordion-group--contained">
  <div class="puik-accordion">
    <button aria-expanded="false" aria-controls="accordion-id-1" class="puik-accordion__header">
      <div class="puik-accordion__header__content">
        <div class="puik-accordion__header__content__title">Title 1</div>
      </div>
      <div class="puik-icon material-icons-round puik-accordion__header__expand__icon" style="font-size: 24px;">keyboard_arrow_down</div>
    </button>
    <div id="accordion-id-1" class="puik-accordion__content"> Content 1 </div>
  </div>
  <div class="puik-accordion">
    <button aria-expanded="false" aria-controls="accordion-id-2" class="puik-accordion__header">
      <div class="puik-accordion__header__content">
        <div class="puik-accordion__header__content__title">Title 2</div>
      </div>
      <div class="puik-icon material-icons-round puik-accordion__header__expand__icon" style="font-size: 24px;">keyboard_arrow_down</div>
    </button>
    <div id="accordion-id-2" class="puik-accordion__content"> Content 2 </div>
  </div>
</div>
```

### Subtitle

You can add a subtitle to each accordion:

```html{5}
<div class="puik-accordion">
  <button aria-expanded="false" aria-controls="accordion-id" class="puik-accordion__header">
    <div class="puik-accordion__header__content">
      <div class="puik-accordion__header__content__title">Title</div>
      <div class="puik-accordion__header__content__sub-title">Sub-title</div>
    </div>
    <div class="puik-icon material-icons-round puik-accordion__header__expand__icon" style="font-size: 24px;">keyboard_arrow_down</div>
  </button>
  <div id="accordion-id" class="puik-accordion__content"> Content </div>
</div>
```

### Icon

You can add an icon to each accordion:

```html{7}
<div class="puik-accordion">
  <button aria-expanded="false" aria-controls="accordion-id" class="puik-accordion__header">
    <div class="puik-icon material-icons-round puik-accordion__header__icon" style="font-size: 24px;">check</div>
    <div class="puik-accordion__header__content">
      <div class="puik-accordion__header__content__title">Title</div>
    </div>
    <div class="puik-icon material-icons-round puik-accordion__header__expand__icon" style="font-size: 24px;">keyboard_arrow_down</div>
  </button>
  <div id="accordion-id" class="puik-accordion__content"> Content </div>
</div>
```

### Disabled

You can set an accordion as disabled by adding the `puik-accordion--disabled` class, and the `disabled` attribute to the button: 

```html{2, 3}
<div class="puik-accordion-group">
  <div class="puik-accordion puik-accordion--disabled">
    <button aria-expanded="false" aria-controls="accordion-id" class="puik-accordion__header" disabled>
      <div class="puik-accordion__header__content">
        <div class="puik-accordion__header__content__title">Disabled accordion sub-title</div>
      </div>
      <div class="puik-icon material-icons-round puik-accordion__header__expand__icon" style="font-size: 24px;">keyboard_arrow_down</div>
    </button>
    <div id="accordion-id" class="puik-accordion__content" style="display: none;"> Content 1 </div>
  </div>
</div>
```

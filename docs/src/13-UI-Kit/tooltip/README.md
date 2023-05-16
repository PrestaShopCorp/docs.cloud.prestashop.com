---
title: Tooltip
---

# Migrating the Tooltip Component

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/tooltip)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-tooltip--default)
- [Zeroheight](https://zeroheight.com/47c0ab1be/p/65b8a0-tooltip/b/87b096)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/4.0/components/tooltips/) used in the PrestaShop UIKit:

```html
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
  Tooltip on top
</button>
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="right" title="Tooltip on right">
  Tooltip on right
</button>
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">
  Tooltip on bottom
</button>
<button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="left" title="Tooltip on left">
  Tooltip on left
</button>
```

## PUIK

### Basic Use

For any tooltip component that you use, replace the structure above with the following structure:

```html
<puik-tooltip position="top">
        <puik-icon font-size="1.25rem" icon="help_outline" />
        <template #title>Title</template>
        <template #description>This is a top tooltip</template>
      </puik-tooltip>
      <puik-tooltip position="bottom">
        <puik-icon font-size="1.25rem" icon="help_outline" />
        <template #title>Title</template>
        <template #description>This is a bottom tooltip</template>
      </puik-tooltip>
      <puik-tooltip position="left">
        <puik-icon font-size="1.25rem" icon="help_outline" />
        <template #title>Title</template>
        <template #description>This is a left tooltip</template>
      </puik-tooltip>
      <puik-tooltip position="right">
        <puik-icon font-size="1.25rem" icon="help_outline" />
        <template #title>Title</template>
        <template #description>This is a right tooltip</template>
      </puik-tooltip>
```

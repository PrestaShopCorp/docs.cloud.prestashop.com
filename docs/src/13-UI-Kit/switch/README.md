---
title: Switch
---

# Migrating the Alert Component

## Sources

- [Github](https://github.com/PrestaShopCorp/puik/tree/main/packages/components/switch)
- [Storybook](https://uikit.prestashop.com/?path=/story/components-switch--default)

## PrestaShop UIKit

Original [bootstrap component](https://getbootstrap.com/docs/5.1/forms/checks-radios/#switches) used in the PrestaShop UIKit:

```html
<div class="form-check form-switch">
  <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
  <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
</div>
```

## PUIK

### Basic Use

For any alert component that you use, replace the structure above with the following structure:

```html
<puik-switch v-model="firstSwitch">My Switch Label</puik-switch>
```

### On/Off

A switch is set as off by default. It can be set as on...
```html
to do
```

### Enabled/Disabled

A switch is set as enabled by default. It can be set as disabled by adding the `disabled` attribute:

```html
<puik-switch v-model="thirdSwitch" disabled>Disabled On</puik-switch>
<puik-switch v-model="lastSwitch" disabled>Disabled Off</puik-switch>
```

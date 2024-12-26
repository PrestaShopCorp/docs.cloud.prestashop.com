---
title: Address pane
---

[[toc]]

# Address pane

You can choose to add the following address pane at the location of your choice within your module:

![PrestaShop Billing Address Pane](/assets/images/billing/ps_billing_address_pane.png)

## Add in your DOM the address pane locator

Access the file corresponding to the location where you want to display the pane (for example, a template file), then add the following code to display the pane.

```javascript
<div id="ps-billing-address"></div>
<div id="ps-billing-modal"></div>
```

## Initialize the address component

Add the following code to load the component.

```javascript
window.psBilling.initializeAddress(
  window.psBillingContext.context,
  "#ps-billing-address",
  "#ps-billing-modal"
);
```

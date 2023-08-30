---
title: Invoice pane
---

[[toc]]

# Invoice pane

You can choose to add the following invoice pane at the location of your choice within your module:

![PrestaShop Billing Invoice Pane](/assets/images/billing/ps_billing_invoice_pane.jpg)

## Add in your DOM the invoice pane locator

Access the file corresponding to the location where you want to display the pane (for example, a template file), then add the following code to display the pane.

```javascript
<div id="ps-billing-invoice"></div>
```

## Initialize the invoice component 

Add the following code to load the component.

```javascript
window.psBilling.initializeInvoiceList(
  window.psBillingContext.context,
  "#ps-billing-invoice"
);
```

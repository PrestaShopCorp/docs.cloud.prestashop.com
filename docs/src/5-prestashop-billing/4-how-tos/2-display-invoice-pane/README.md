# Display the Invoice Pane

You can choose to add the following invoice pane at the location of your choice within your module:

![PrestaShop Billing Invoice Pane](/assets/images/billing/ps_billing_invoice_pane.jpg)

To do so:

1. Access the file corresponding to the location where you want to display the pane (for example, a template file).

2. Add the following code to display the pane:

```js
<div id="ps-billing-invoice"></div>
```

3. Add the following code to load the JavaScript information:

```js
window.psBilling.initializeInvoiceList(
  window.psBillingContext.context,
  "#ps-billing-invoice"
);
```

---
title: How-Tos
---

[[toc]]

# How-tos

How tos are independant tutorials about some options and other implementations that the Prestashop Billing services offer.

## Implementing a Stair-step pricing model

[Our main Tutorial](../3-tutorial/README.md) presented you with the required steps to implement any of our supported pricing models, but more informations are needed in the [context](#context) for a Stair-step pricing model, which will be explained by this tutorial.

:::warning
This tutorial assumes that you have already familiarized yourself with our [webhook system](../../6-billing-webhooks-events/README.md), which is necessary to implement the [second part](#second-step-updating-the-subscription-via-api) of this tutorial.
:::

### First step: Implementing it in the module
As Stair-step requires a unit to operate, you should pass that information during the initialization of `window.psBilling`, like so:

```js
<script>
  const context = { ...window.psBillingContext.context, product: { components: [
    {
      id: 'my-price-EUR-monthly', // This is an exemple and should be replaced with your id
      unitDescription: 'user' // This is an exemple and should be replaced with your unit description
    }
  ]}};
  window.psBilling.initialize(context, '#ps-billing', '#ps-modal', (type, data) => {
      // Event hook listener
      switch (type) {
        // Hook triggered when PrestaShop Billing is initialized
          case window.psBilling.EVENT_HOOK_TYPE.BILLING_INITIALIZED:
              console.log('Billing initialized', data);
              break;
        // Hook triggered when the subscription is created or updated
          case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_UPDATED:
              console.log('Sub updated', data);
            break;
        // Hook triggered when the subscription is cancelled
          case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_CANCELLED:
              console.log('Sub cancelled', data);
              break;
      }
  });
</script>
```
The `id` property should have been communicated to you beforehand (as the [subscription item](#subscription-item) id)

### Second step: Updating the subscription via API

Since a Stair-Step pricing model requires the update of the unit per subscription before the renewal of said subscription, we provide an endpoint to do so:

`https://api.billing.prestashop.com/v1/subscriptions/{subscriptionId}/items/{subscriptionItemId}/quantity`

The `subscriptionId` can be found in the events sent by our Webhooks (`data.subscription.id`) while the `subscriptionItemId` should have been communicated to you upon creation of your plans in our system.

A typical request could look like this: 

```javascript
// Replace {subscriptionId} and {subscriptionItemId}
const url = 'https://api.billing.prestashop.com/v1/subscriptions/{subscriptionId}/items/{subscriptionItemId}/quantity';
const options = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: ''
  },
  body: '{"quantity":10}'
};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```
Upon receiving a `200` response containing a body of the following snippet, the subscription will be updated, and the next invoice will reflect this new information.
```json
{
  "item": {
    "quantity": 10
  }
}
```

For more informations, as well as mockups servers, sample response & request data, you can directly head to our API Reference which explores in great detail how to use the endpoint [here](https://prestashop-billing.stoplight.io/docs/api-gateway/533ffe47d3f3a-set-the-quantity-of-a-subscription-item) 

## Display the Invoice Pane

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

## Use BillingService to Retrieve Billing Data in PHP

As seen in the `services.yml` file, the PrestaShop Billing composer provides a BillingService:

```yaml
<module_name>.ps_billings_service:
  class: PrestaShopCorp\Billing\Services\BillingService
  public: true
  arguments:
    - "@<module_name>.ps_billings_context_wrapper"
    - "@<module_name>.module"
```

If needed, you can retrieve this service and its data in the same way you retrieve the facade:

```php
// Load the service for PrestaShop Billing
$billingService = $this->getService('<module_name>.ps_billings_service');

// Retrieve the customer
$customer = $billingService->getCurrentCustomer();

// Retrieve the subscription for this module
$subscription = $billingService->getCurrentSubscription();

// Retrieve the list and description of module plans
$plans = $billingService->getModulePlans();
```

Each method will return a PHP array with the following format:

```
[
    'success' => true,    // returns true if status is 2xx
    'httpStatus' => 200,  // normalized HTTP status
    'body' => [],         // The data to retrieve, the format is similar to the one used in the webhook system
];
```

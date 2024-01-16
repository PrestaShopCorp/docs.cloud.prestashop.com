---
title: Checkout Subscription
---

[[toc]]

# Checkout Subscription

## Use case

Some of our user don't want to use the whole funnel, because it doesn't fit very well with the onboarding flow. We provide a checkout only component, which handle only the the payment method, billing address and the subscription CTA.

This component can be imported in any layout: a page, a modal, a fullscreen modal...


![Checkout Subscription component](/assets/images/billing/checkout-subscription.png)

## Implementation

### Add the component in your page

First of all you need to add `@prestashopcorp/billing-cdc` to your project. 

```
# Import from CDN
<script src="https://unpkg.com/@prestashopcorp/billing-cdc/dist/bundle.js"></script>

# OR add it to your project dependencies
npm add @prestashopcorp/billing-cdc
```

`@prestashopcorp/billing-cdc` provide the component `SubscriptionCheckoutComponent`. Depending on your project setup, the way you will use this component will change.

#### Vue 3

You need to instantiate the component in the JS part, then use it in your Vue template.

::: warning
[Vite](https://vitejs.dev/) user can get this error `Uncaught TypeError: Expected string or element selector to be passed`. 

In this cas an alias should be added in vite.config.js: `defineViteConfig({ resolve: { alias: { vue: "vue/dist/vue.esm-bundler.js" } } })`.
:::

```vue
<template>
  <SubscriptionCheckout
    :context="billingContext"
    :on-event-hook="eventHookHandler"
  />
</template>

<script setup lang="ts">
import { SubscriptionCheckoutComponent } from '@prestashopcorp/billing-cdc';

const SubscriptionCheckout = await SubscriptionCheckoutComponent.driver('vue3');

// billingContext object and eventHookHandler method 
// will be detailed in the next steps

</script>
```


#### Vanilla JS

You need to instantiate the component in the JS part, then attache the component to a div with the method `render(selectorCss: string)`.

```html
<body>
  <div id="ps-billing">
  <script>
    const subscription = new window.psBilling.SubscriptionCheckoutComponent({
      context: billingContext,
      onEventHook: eventHookHandler
    });
    customer.render('#ps-billing');
  </script>
</body>
```

### Build the context

We provide a PHP lib which create the billingContext for you, but if you want to display the checkout outside of a PrestaShop shop, you need to build it manually. Here is an example of the context. Please find more information about the context [in PrestaShop Billing CDC page](http://localhost:8080/5-prestashop-billing/6-references/3-billing-cdc/#context).

:::tip Note
The `contextType` set to shop means that you want to attach the subscription to a shop.
:::


```javascript
const billingContext = {
  contextType: 'shop',
  contextVersion: 2,
  billingEnv: 'production', // could be 'preprod' depending on your authentication configuration
  isSandbox: true, 
  accessToken: 't0K3N',     // the authentication token of your user, it should contain the scope "subscription.write"
  i18n: {
    isoCode: 'en',          // two-letter format
  },
  organization: {
    uuid: 'authenticated_user_uUiD',
    email: 'john.doe@prestashop.com'
  },
  // This shop part is not required it the context you use is not "shop"
  shop: {
    uuid: 'shop_uuid',      // required if the shop node exists
    domain: '',             // the domain of the shop (optional)
  },
  product: {
    id: 'your_product_id',
    displayName: 'Product', // Used in the top of the summary card (optional)
    logoSrc: '',            // Used in the top of the summary card (optional)
    tosUrl: '',             // Link to your toc, displayed behind the summary card
    privacyUrl: '',         // Link to your privacy, displayed behind the summary card
  },
  offerSelection: {
    offerPricingId: 'the _plan_selected'
  },
}
```

Please ask us to know the value to provide as `product.id` and `offerSelection.offerPricingId`.

### React to the event hook

The event hook allows you to update your UI, when an important event occurs, like the creation of a subscription.

:::warning 
Please do not use the event hook to register the fact a customer has subscribe to your product. It's not safe. Prefer the [webhook mechanism](../../6-references/1-webhook/).
:::

#### Vue 3

```vue
<script setup lang="ts">
// Add import of EVENT_HOOK_TYPE
import { SubscriptionCheckoutComponent, EVENT_HOOK_TYPE } from '@prestashopcorp/billing-cdc';

//...

const onEventHook = (type, data) => {
  // Event hook listener
  switch (type) {
    case EVENT_HOOK_TYPE.SUBSCRIPTION_CREATED:
      // Do something
      break;
    case EVENT_HOOK_TYPE.SUBSCRIPTION_UPDATED:
      // Do something
      break;
  }
}
</script>
```


#### Vanilla JS


```javascript
function onEventHook(type, data) {
  // Event hook listener
  switch (type) {
    case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_CREATED:
      // Do something
      break;
    case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_UPDATED:
      // Do something
      break;
  }
}
```



## Specific use case

### Partner account

The fact that the subscription is owned by a user rather than a shop, makes integration within the partner account quite particular. The context has to be modified, as below, to handle the specificity.

```javascript
const billingContext = {
  contextType: 'user',
  contextVersion: 2,
  billingEnv: 'production', // could be 'preprod' depending on your authentication configuration
  isSandbox: true, 
  accessToken: 't0K3N',     // the authentication token of your user, it should contain the scope "subscription.write"
  i18n: {
    isoCode: 'en',          // two-letter format
  },
  organization: {
    uuid: '<sub_in_access_token>',
    email: 'john.doe@prestashop.com'
  },
  product: {
    id: 'partner_account',
  },
  offerSelection: {
    offerPricingId: 'partner_account-standard',
    singleSubscriptionIdentifier: '<addons_product_id>', // Required to allow multiple subscription for the same billing product
  },
}
```
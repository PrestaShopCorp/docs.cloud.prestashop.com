---
title: Payment Method
---

[[toc]]

# Payment Method

## Use case

Some of our users don't want to use the whole funnel, because it doesn't fit very well with the onboarding flow. We provide a checkout only component, which handle only the payment method.

This component can be imported in any layout: a page, a modal, a fullscreen modal...

![PrestaShop Payment Method Pane](/assets/images/billing/ps_billing_payment_method-pane.png)

## Implementation

### Add the component in your page

First of all you need to add `@prestashopcorp/billing-cdc` to your project.

```
# Import from CDN
<script src="https://unpkg.com/@prestashopcorp/billing-cdc/dist/bundle.js"></script>

# OR add it to your project dependencies
npm add @prestashopcorp/billing-cdc
```

`@prestashopcorp/billing-cdc` provides the component `UserPaymentMethodManagementComponent` and `ModalContainerComponent`. Depending on your project setup, the way you will use this component will change.

### Build the context

We provide a PHP lib which create the billingContext for you, but if you want to display the checkout outside of a PrestaShop shop, you need to build it manually. Here is an example of the context. Please find more information about the context [in PrestaShop Billing CDC page](http://localhost:8080/5-prestashop-billing/6-references/3-billing-cdc/#context).

:::tip Note
The `contextType` set to shop means that you want to attach the subscription to a shop.
:::


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
}
```

#### Vue 3

You need to instantiate the component in the JS part, then use it in your Vue template.

::: warning
[Vite](https://vitejs.dev/) user can get this error `Uncaught TypeError: Expected string or element selector to be passed`.

In this case an alias should be added in vite.config.js: `defineViteConfig({ resolve: { alias: { vue: "vue/dist/vue.esm-bundler.js" } } })`.
:::

```html
<template>
  <UserPaymentMethodManagementComponent
    :context="billingContext"
    :onOpenModal="openBillingModal"
  />

  <PsBillingModal
    :context="billingContext"
    :type="modalType"
    :on-close-modal="closeBillingModal"
  />
</template>

<script setup lang="ts">
import { UserPaymentMethodManagementComponent, ModalContainerComponent } from '@prestashopcorp/billing-cdc';

const UserPaymentMethodManagement = await UserPaymentMethodManagementComponent.driver('vue3');
const PsBillingModal = ModalContainerComponent.driver('vue3');

const modalType = ref<string>('');

const billingContext = {
  contextType: 'user',
  contextVersion: 2,
  billingEnv: 'production', // could be 'preprod' depending on your authentication configurationOFF-1282/feat/standalone-address-component
    isoCode: 'en',          // two-letter format
  },
  organization: {
    uuid: '<sub_in_access_token>',
    email: 'john.doe@prestashop.com'
  },
}

const openBillingModal = (type: string, data?: Record<string, unknown>) => {
  modalType.value = type;
  billingContext = { ...billingContext, ...data };
};

const closeBillingModal = () => {
  modalType.value = '';
};

</script>
```

#### Vanilla JS

You need to instantiate the component in the JS part, then attach the component to a div with the method `render(selectorCss: string)`.

```html
<body>
  <div id="ps-payment-method"></div>
  <div id="ps-modal"></div>
  <script>
        /*********************
        * PrestaShop Billing *
        * *******************/
        const onCloseModal = async (data) => {
          // When a modal is closed, we need to update the context
          await Promise.all([currentModal.close(), updateCustomerProps(data)]);
        };

        // Open the proper modal
        const onOpenModal = (type, data) => {
          currentModal = new window.psBilling.ModalContainerComponent({
            type,
            context: {
              ...context,
              ...data,
            },
            onCloseModal,
          });
          currentModal.render('#ps-modal');
        };

        const updateCustomerProps = (data) => {
          return customer.updateProps({
            context: {
              ...context,
              ...data,
            },
          });
        };

        let currentModal;

        // Here we instantiate the subscription management component
        const address = new window.psBilling.UserPaymentMethodManagement({
          context,
          onOpenModal,
        });
        // Render the subscription management
        address.render('#ps-payment-method');
  </script>
</body>
```

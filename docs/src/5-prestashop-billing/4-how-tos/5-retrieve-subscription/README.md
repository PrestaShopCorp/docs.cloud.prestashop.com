---
title: Retrieve customer's subscription
---

[[toc]]

# Retrieve customer's subscription

In case you want to have a specific display when your customer already has a subscription or you handle the plan selection by yourself, you need to know if the customer already has a subscription. You can achieve this with our PHP library [`module-lib-billing`](https://packagist.org/packages/prestashopcorp/module-lib-billing).

## Add retrieve subscription

You should be able to retrieve subscription in the configuration page for your module in the back office (located by default at `views/templates/admin/configure.tpl`).

This is a simple working example that is purposefully basic, you can make the code as complex as you need it to be to cover your needs as long as you follow the steps in this guide.

1. Create a JS file in your module: `views/js/configure.js` and inject it into `<module_name>.php` file.

   ```php{43-56,77-78}
      public function getContent()
      {
        // ...
        $this->context->smarty->assign([
          // ...
          'urlConfigureJs' => $this->getPathUri() . 'views/js/ configure.js',
        ]);
        // ...
      }
   ```

2. Retrieve current subscription from Billing API and inject it into your template

   ```php{43-56,77-78}
      public function getContent()
      {
        // ...

        /**********************
         * PrestaShop Billing *
         * *******************/
        // Billing Service

        // Load the service for PrestaShop Billing
        $billingService = $this->getService('<module_name>.ps_billings_service');

        // Retrieve plans and addons for your module
        $productComponents = $billingService->getProductComponents();

        $componentItems = [];
        // We test here the presence of the items property in the response's body.
        if (!empty($productComponents['body']['items']))
        {
          $componentItems = $productComponents['body']['items'];
        }

        // Allow the use of $componentItems in your tpl file
        $this->context->smarty->assign([
          'componentItems' => $componentItems,
        ]);

        // Retrieve current subscription
        $currentSubscription = $billingService->getCurrentSubscription();

        $subscription = [];
        // We test here the success of the request in the response's body.
        if (!empty($currentSubscription['success']))
        {
            $subscription = $currentSubscription['body'];
        }

        // Allow the use of $subscription & $hasSubscription in your tpl file
        $this->context->smarty->assign([
            'subscription' => $subscription,
            'hasSubscription' => !empty($subscription),
        ]);

        // ...
      }
   ```

3. Inject `views/js/configure.js` as a script and add it in `views/templates/admin/configure.tpl`

   ```html{7}
   <prestashop-accounts></prestashop-accounts>
   <div id="ps-billing"></div>
   <div id="ps-modal"></div>

   {literal}
   <script>
      const hasSubscription = {/literal}{$hasSubscription|intval}{literal};
   </script>
   {/literal}

   <script src="{$urlAccountsCdn|escape:'htmlall':'UTF-8'}" rel=preload></script>
   <script src="{$urlBilling|escape:'htmlall':'UTF-8'}" rel=preload></script>
   <script src="{$urlConfigureJs|escape:'htmlall':'UTF-8'}" rel=preload></script>
   ```

4. Implement `views/js/configure.js` to make billing work with the component instead of the `initialize` method

   ```javascript
   window?.psaccountsVue?.init();

   let billingContext = { ...window.psBillingContext.context };
   let currentModal;
   let customer;

   if (window.psaccountsVue.isOnboardingCompleted() == true) {
     customer = new window.psBilling.CustomerComponent({
       context: billingContext,
       hideInvoiceList: true,
       onOpenModal,
       onEventHook,
       onOpenFunnel,
     });
     customer.render("#ps-billing");

     // Initialize invoice list only if we have subscription
     if (hasSubscription) {
       window.psBilling.initializeInvoiceList(
         billingContext,
         "#ps-billing-invoice"
       );
     }
   }

   // Modal open / close management
   async function onCloseModal(data) {
     await Promise.all([currentModal.close(), updateCustomerProps(data)]);
   }

   function onOpenModal(type, data) {
     currentModal = new window.psBilling.ModalContainerComponent({
       type,
       context: {
         ...billingContext,
         ...data,
       },
       onCloseModal,
       onEventHook,
     });
     currentModal.render("#ps-modal");
   }

   function updateCustomerProps(data) {
     return customer.updateProps({
       context: {
         ...billingContext,
         ...data,
       },
     });
   }

   function showBillingInvoiceWrapper() {
     document.getElementById("ps-billing-invoice").innerHTML = "";
     window.psBilling.initializeInvoiceList(
       billingContext,
       "#ps-billing-invoice"
     );
   }

   function showPlanPresenter() {
     document.getElementById("billing-plan-presenter").classList.remove("hide");
     document.getElementById("ps-billing-wrapper").classList.add("hide");
   }

   function showBillingWrapper() {
     document.getElementById("billing-plan-presenter").classList.add("hide");
     document.getElementById("ps-billing-wrapper").classList.remove("hide");
   }

   function onEventHook(type, data) {
     // Event hook listener
     switch (type) {
       case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_CREATED:
         console.log("subscription created");
         showBillingWrapper();
         showBillingInvoiceWrapper();
         break;
       case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_UPDATED:
         console.log("subscription updated");
         showBillingWrapper();
         showBillingInvoiceWrapper();
         break;
     }
   }

   function onOpenFunnel({ subscription }) {
     showPlanPresenter();
   }

   // Open the checkout full screen modal
   function openCheckout(pricingId) {
     const offerSelection = { offerSelection: { offerPricingId: pricingId } };
     onOpenModal(
       window.psBilling.MODAL_TYPE.SUBSCRIPTION_FUNNEL,
       offerSelection
     );
   }
   ```

5. Display your plan in your module and hide the subscription management in `views/templates/admin/configure.tpl`

   ```html{4-23}
      <prestashop-accounts></prestashop-accounts>

      <!-- You should use the billing plan library in order to display your plan -->
      <section id="billing-plan-selection" {if $hasSubscription}class="hide"{/if}>
        <h2>Select your plan</h2>
        <div id="back-button" {if !$hasSubscription}class="hide" {/if}>
          <button onclick="showBillingWrapper()"
            style="background: black;color: white; padding: 0.5rem; font-weight: bold;margin-bottom: 1.5rem;">Back to
            subscription</button>
        </div>
        <div style="width: 500px; display:flex">
          {foreach $componentItems as $item}
            <div style="border: 1px solid;padding: 2rem;text-align:center;margin-left:1rem;">
              <h3 style="font-weight: bold;margin-bottom: 1rem;">{$item['name']}</h3>

              <!-- Pricing information must be retrieved from billing API -->
              <p style="margin-bottom: 1rem;">{$item['price']/100}€/{$item['billingPeriodUnit']}</p>
              <!-- Pricing id must be retrieved from billing API -->
              <button onclick="openCheckout('{$item['id']}')"
                style="background: black;color: white; padding: 0.5rem; font-weight: bold;margin-bottom: 1.5rem;">Select this
                offer</button>

              {if !empty($item['features'])}
                <div class="billing-plan__feature-group">
                  {foreach $item['features'] as $feature}
                    <div style="display: flex; flex-direction: row;">
                      <div style="display: flex; flex-direction: row; align-items: flex-start;">
                        <div class="puik-icon material-icons-round" style="font-size: 1.25rem;">check</div>
                        <div>{$feature}</div>
                      </div>
                    </div>
                  {/foreach}
                </div>
              {/if}
          {/foreach}
        </div>
      </section>

      <div id="ps-billing-wrapper" {if !$hasSubscription}class="hide"{/if}>
        <div id="ps-billing"></div>
        <div id="ps-billing-invoice"></div>
      </div>
      <div id="ps-modal"></div>
   ```

---
title: Handle plan selection by yourself
---

[[toc]]

### Add plan selection

You should add your plan presentation in the configuration page for your module in the back office (located by default at `views/templates/admin/configure.tpl`). In order to handle plan selection by yourself, you must use the subscription management component and the checkout modal instead of the `window.psBilling.initialize` method.

:::tip Note
`window.psBilling.initialize` is only a wrapper to simplify the implementation of your module.
:::

This is a simple working example that is purposefully basic, you can make the code as complex as you need it to be to cover your needs as long as you follow the steps in this guide.

1. **Create a JS file in your module**: `views/js/configure.js` and inject it into `<module_name>.php` file.

   ```php{6}
      public function getContent()
      {
        // ...
        $this->context->smarty->assign([
          // ...
          'urlConfigureJs' => $this->getPathUri() . 'views/js/configure.js',
        ]);
        // ...
      }
   ```

2. **Create the BillingApiGatewayAdapter class:**

   Implement the `BillingApiGatewayAdapter` to handle API interactions with the Billing service.

   ```php
   class BillingApiGatewayAdapter
   {
       private const BILLING_URL = 'https://api.billing.prestashop.com/v1/';

       private $jwt;

       public function __construct($jwt)
       {
           $this->jwt = $jwt;
       }

       public function getProductComponents($productId, $lang)
       {
           // Use Symfony client or create your own HTTP client based on curl
           $httpClient = new HttpClient(self::BILLING_URL);
           $httpClient->setHeaders([
               'Accept: application/json',
               'Authorization: Bearer ' . $this->jwt,
               'Content-Type: application/json',
               'User-Agent: module-lib-billing (' . $productId . ')',
           ]);

           return $httpClient->setQueryParams(['filter_status' => 'active', 'lang' => $lang])->get('/products/' . $productId . '/components');
       }
   }
   ```

3. **Retrieve plan pricing from Billing API and inject it into your template**

Billing will not provide the name of the plans and the list of features, you must provide it to manage your display in your module

:::tip Note
For component group id, please get in touch with your Solution Engineer at PrestaShop.
:::

```php{13-59}
   public function getContent()
   {
     // ...

     // Load the BillingAdapter with the JWT token
     $jwt = $psAccountsService->getOrRefreshToken();
     $billingApiGatewayAdapter = new BillingApiGatewayAdapter($jwt);

     // Retrieve plans and addons for your module and use the proper language
     $productComponents = $billingApiGatewayAdapter->getProductComponents($this->module->name, 'fr');

     $componentItems = [];
     if (!empty($productComponents['body']['items']))
     {
       $componentItemsTmp = $productComponents['body']['items'];
       // You need to retrieve plan information from your API or Class or Array like this
       // For plan id, please get in touch with your Solution Engineer at PrestaShop.
       // Values "moduleid-plana" and "moduleid-planb" must be replaced by the component id
       // returned by $billingService->getProductComponents();
       $planInfos = [
           [
             "component_group_id" => "moduleid-plana",
             "name" => "Plan A",
             "features" => [
               "Plan A Feature 1",
               "Plan A Feature 2",
               "Plan A Feature 3"
             ]
           ],
           [
               "component_group_id" => "moduleid-planb",
               "name" => "Ultimate",
               "features" => [
                 "All features from Plan A, plus...",
                 "Plan B Feature 1",
                 "Plan B Feature 2"
               ]
           ]
       ];

       foreach($componentItemsTmp as $componentItemTmp) {
         // Filter to retrieve only plans
         if($componentItemTmp['componentType'] == 'plan') {
           $planInfoIndex = array_search($componentItemTmp['componentGroupId'], array_column($planInfos, 'component_group_id'));
           $componentItemTmp['details'] = [
             "features" => $planInfos[$planInfoIndex]['features'],
             "name" => $planInfos[$planInfoIndex]['name'],
           ];
           array_push($componentItems, $componentItemTmp);
         }
       }
     }

     // Allow the use of $componentItems in your tpl file
     $this->context->smarty->assign([
       'componentItems' => $componentItems,
     ]);

     // ...
   }
```

3. Inject `views/js/configure.js` as a script in `views/templates/admin/configure.tpl`

   ```html{7}
   <prestashop-accounts></prestashop-accounts>
   <div id="ps-billing"></div>
   <div id="ps-modal"></div>

   <script src="{$urlAccountsCdn|escape:'htmlall':'UTF-8'}" rel=preload></script>
   <script src="{$urlBilling|escape:'htmlall':'UTF-8'}" rel=preload></script>
   <script src="{$urlConfigureJs|escape:'htmlall':'UTF-8'}" rel=preload></script>
   ```

4. Implement `views/js/configure.js` to make billing works with the component instead of the `initialize` method

   ```javascript{8-14,18-20,22-33,35-42}
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
     });
     customer.render("#ps-billing");
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

   function onEventHook(type, data) {
     // Do anything
   }
   ```

5. Display your plan in your module and hide the subscription management in `views/templates/admin/configure.tpl`

   ```html{4-32}
      <prestashop-accounts></prestashop-accounts>

      <!-- You should use the billing plan library in order to display your plan -->
      <section id="billing-plan-selection" style="display:none">
        <h2>Select your plan</h2>
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

      <div id="ps-billing-wrapper" style="display:none">
        <div id="ps-billing"></div>
      </div>
      <div id="ps-modal"></div>
   ```

6. Display the checkout modal when your user click on the plan selection button

   ```javascript{14,52,55,60-74}
    window?.psaccountsVue?.init();

    let billingContext = { ...window.psBillingContext.context }
    let currentModal;
    let customer;

    if(window.psaccountsVue.isOnboardingCompleted() == true) {

      showPlanSelection();

      customer = new window.psBilling.CustomerComponent({
        context: billingContext,
        hideInvoiceList: true,
        onOpenModal,
        onEventHook
      });
      customer.render('#ps-billing');
    }

    // Modal open / close management
    async function onCloseModal(data) {
      await Promise.all([currentModal.close(), updateCustomerProps(data)]);
    };

    function onOpenModal(type, data) {
      currentModal = new window.psBilling.ModalContainerComponent({
        type,
        context: {
          ...billingContext,
          ...data,
        },
        onCloseModal,
        onEventHook
      });
      currentModal.render('#ps-modal');
     };

    function updateCustomerProps(data) {
      return customer.updateProps({
        context: {
          ...billingContext,
          ...data,
        },
      });
    };

    // Event hook management
    function onEventHook(type, data) {
      // Event hook listener
      switch (type) {
        case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_CREATED:
          showBillingWrapper();
          break;
        case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_UPDATED:
          showBillingWrapper();
          break;
      }
    }

    function showPlanSelection() {
      document.getElementById('billing-plan-selection').style.display = 'block';
      document.getElementById('ps-billing-wrapper').style.display = 'none';
    }

    function showBillingWrapper() {
      document.getElementById('billing-plan-selection').style.display = 'none';
      document.getElementById('ps-billing-wrapper').style.display = 'block';
    }

    // Open the checkout full screen modal
    function openCheckout(pricingId) {
      const offerSelection = {offerSelection: {offerPricingId: pricingId }};
      onOpenModal(window.psBilling.MODAL_TYPE.SUBSCRIPTION_FUNNEL, offerSelection);
    };
   ```

   <!-- TODO: add information about the plan-billing components -->

### Handle plan change / select button

![PrestaShop Change Plan button](/assets/images/billing/change_plan_button.png)

When your customer click on the **"Change Plan"** button, it opens the default plan selection, provided by billing, within the funnel.

In case you handle the plan selection by yourself, you don't want the default plan selection to be displayed when your customer want to change their plan.

1. Provide a `onOpenFunnel` function into the Customer context

   ```javascript{11,15-18}
    if(window.psaccountsVue.isOnboardingCompleted() == true) {

      // Then the plan selection should be displayed
      showPlanSelection();

      customer = new window.psBilling.CustomerComponent({
        context: billingContext,
        hideInvoiceList: true,
        onOpenModal,
        onEventHook,
        onOpenFunnel
      });
      customer.render('#ps-billing');
    }
    // Here is the method called when your customer hits the "Change Plan" button
    function onOpenFunnel({ subscription }) {
      showPlanSelection();
    }
   ```

## Deprecated

::: warning
This document has been **deprecated**. While the information below remains valid for historical purposes, we recommend referring to the updated documentation for the latest guidance.
:::

The billing funnel can handle for you the plan selection, but sometimes you may prefer to present your plan by yourself to be more precise about your offer.

In such a case you should provide to the billing context the selected plan, and if applicable the quantity associated with.

:::warning Warning
When you handle the plan selection by yourself, we recommend you to retrieve the [subscription in PHP](../5-retrieve-subscription/README.md) to know if you must display the plan selection or the subscription during billing-cdc bootstrap.
:::

### Add plan selection

You should add your plan presentation in the configuration page for your module in the back office (located by default at `views/templates/admin/configure.tpl`). In order to handle plan selection by yourself, you must use the subscription management component and the checkout modal instead of the `window.psBilling.initialize` method.

:::tip Note
`window.psBilling.initialize` is only a wrapper to simplify the implementation of your module.
:::

This is a simple working example that is purposefully basic, you can make the code as complex as you need it to be to cover your needs as long as you follow the steps in this guide.

1. Create a JS file in your module: `views/js/configure.js` and inject it into `<module_name>.php` file.

   ```php{6}
      public function getContent()
      {
        // ...
        $this->context->smarty->assign([
          // ...
          'urlConfigureJs' => $this->getPathUri() . 'views/js/configure.js',
        ]);
        // ...
      }
   ```

2. Retrieve plan pricing from Billing API and inject it into your template

Billing will not provide the name of the plans and the list of features, you must provide it to manage your display in your module

:::tip Note
For component group id, please get in touch with your Solution Engineer at PrestaShop.
:::

```php{13-59}
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
     if (!empty($productComponents['body']['items']))
     {
       $componentItemsTmp = $productComponents['body']['items'];
       // You need to retrieve plan information from your API or Class or Array like this
       // For plan id, please get in touch with your Solution Engineer at PrestaShop.
       // Values "moduleid-plana" and "moduleid-planb" must be replaced by the component id
       // returned by $billingService->getProductComponents();
       $planInfos = [
           [
             "component_group_id" => "moduleid-plana",
             "name" => "Plan A",
             "features" => [
               "Plan A Feature 1",
               "Plan A Feature 2",
               "Plan A Feature 3"
             ]
           ],
           [
               "component_group_id" => "moduleid-planb",
               "name" => "Ultimate",
               "features" => [
                 "All features from Plan A, plus...",
                 "Plan B Feature 1",
                 "Plan B Feature 2"
               ]
           ]
       ];

       foreach($componentItemsTmp as $componentItemTmp) {
         // Filter to retrieve only plans
         if($componentItemTmp['componentType'] == 'plan') {
           $planInfoIndex = array_search($componentItemTmp['componentGroupId'], array_column($planInfos, 'component_group_id'));
           $componentItemTmp['details'] = [
             "features" => $planInfos[$planInfoIndex]['features'],
             "name" => $planInfos[$planInfoIndex]['name'],
           ];
           array_push($componentItems, $componentItemTmp);
         }
       }
     }

     // Allow the use of $componentItems in your tpl file
     $this->context->smarty->assign([
       'componentItems' => $componentItems,
     ]);

     // ...
   }
```

3. Inject `views/js/configure.js` as a script in `views/templates/admin/configure.tpl`

   ```html{7}
   <prestashop-accounts></prestashop-accounts>
   <div id="ps-billing"></div>
   <div id="ps-modal"></div>

   <script src="{$urlAccountsCdn|escape:'htmlall':'UTF-8'}" rel=preload></script>
   <script src="{$urlBilling|escape:'htmlall':'UTF-8'}" rel=preload></script>
   <script src="{$urlConfigureJs|escape:'htmlall':'UTF-8'}" rel=preload></script>
   ```

4. Implement `views/js/configure.js` to make billing works with the component instead of the `initialize` method

   ```javascript{8-14,18-20,22-33,35-42}
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
     });
     customer.render("#ps-billing");
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

   function onEventHook(type, data) {
     // Do anything
   }
   ```

5. Display your plan in your module and hide the subscription management in `views/templates/admin/configure.tpl`

   ```html{4-32}
      <prestashop-accounts></prestashop-accounts>

      <!-- You should use the billing plan library in order to display your plan -->
      <section id="billing-plan-selection" style="display:none">
        <h2>Select your plan</h2>
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

      <div id="ps-billing-wrapper" style="display:none">
        <div id="ps-billing"></div>
      </div>
      <div id="ps-modal"></div>
   ```

6. Display the checkout modal when your user click on the plan selection button

   ```javascript{14,52,55,60-74}
    window?.psaccountsVue?.init();

    let billingContext = { ...window.psBillingContext.context }
    let currentModal;
    let customer;

    if(window.psaccountsVue.isOnboardingCompleted() == true) {

      showPlanSelection();

      customer = new window.psBilling.CustomerComponent({
        context: billingContext,
        hideInvoiceList: true,
        onOpenModal,
        onEventHook
      });
      customer.render('#ps-billing');
    }

    // Modal open / close management
    async function onCloseModal(data) {
      await Promise.all([currentModal.close(), updateCustomerProps(data)]);
    };

    function onOpenModal(type, data) {
      currentModal = new window.psBilling.ModalContainerComponent({
        type,
        context: {
          ...billingContext,
          ...data,
        },
        onCloseModal,
        onEventHook
      });
      currentModal.render('#ps-modal');
     };

    function updateCustomerProps(data) {
      return customer.updateProps({
        context: {
          ...billingContext,
          ...data,
        },
      });
    };

    // Event hook management
    function onEventHook(type, data) {
      // Event hook listener
      switch (type) {
        case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_CREATED:
          showBillingWrapper();
          break;
        case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_UPDATED:
          showBillingWrapper();
          break;
      }
    }

    function showPlanSelection() {
      document.getElementById('billing-plan-selection').style.display = 'block';
      document.getElementById('ps-billing-wrapper').style.display = 'none';
    }

    function showBillingWrapper() {
      document.getElementById('billing-plan-selection').style.display = 'none';
      document.getElementById('ps-billing-wrapper').style.display = 'block';
    }

    // Open the checkout full screen modal
    function openCheckout(pricingId) {
      const offerSelection = {offerSelection: {offerPricingId: pricingId }};
      onOpenModal(window.psBilling.MODAL_TYPE.SUBSCRIPTION_FUNNEL, offerSelection);
    };
   ```

   <!-- TODO: add information about the plan-billing components -->

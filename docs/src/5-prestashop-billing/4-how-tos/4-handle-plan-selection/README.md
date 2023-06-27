# Handle plan selection by yourself

The billing funnel can handle for you the plan selection, but sometimes you may prefer to present your plan by yourself to be more precise about your offer.

In such a case you should provide to the billing context the selected plan, and if applicable the quantity associated with.

## Add plan selection

You should add your plan presentation in the configuration page for your module in the back office (located by default at `views/templates/admin/configure.tpl`). In order to handle plan selection by yourself, you must use the subscription management component and the checkout modal instead of the `window.psBilling.initialize` method.

:::tip Note
`window.psBilling.initialize` is only a wrapper to simplify the implementation of your module.
:::

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

2. Retrieve plan pricing from Billing API and inject it into your template

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

        // ...
      }
   ```

3. Retrieve plan pricing from Billing API and inject it into your template

Billing will no longer manage the name of the plans and the list of features, so you must provide it to manage your display in your module

:::tip Note
For plan id, please get in touch with your Solution Engineer at PrestaShop.
:::

```php{43-56,77-78}
     // ...
     if (!empty($productComponents['body']['items']))
     {
       // You need to retrieve plan information from your API or Class or Array like this
       // For plan id, please get in touch with your Solution Engineer at PrestaShop.
       $planInfos = [
           [
               "id" => "<module_name>_free",
               "name" => '<module_name> Free',
           ],
           [
               "id" => "<module_name>_advanced",
               "name" => '<module_name> Advanced',
           ],
           [
               "id" => "<module_name>_ultimate",
               "name" => '<module_name> Ultimate',
           ]
       ];

       // Sorts you plans informations and plans from Billing API
       // to be sure to have the same order
       array_multisort(array_column($planInfos, 'id'), SORT_ASC, $planInfos);
       array_multisort(array_column($componentItems, 'id') , SORT_ASC, $componentItems);

       // Merge plans from Billing API with your plans informations
       $componentItems =  array_replace_recursive($planInfos, $componentItems);
     }
     // ...
```

4. Inject `views/js/configure.js` as a script in `views/templates/admin/configure.tpl`

   ```html{7}
   <prestashop-accounts></prestashop-accounts>
   <div id="ps-billing"></div>
   <div id="ps-modal"></div>

   <script src="{$urlAccountsCdn|escape:'htmlall':'UTF-8'}" rel=preload></script>
   <script src="{$urlBilling|escape:'htmlall':'UTF-8'}" rel=preload></script>
   <script src="{$urlConfigureJs|escape:'htmlall':'UTF-8'}" rel=preload></script>
   ```

5. Implement `views/js/configure.js` to make billing works with the component instead of the `initialize` method

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

6. Display your plan in your module and hide the subscription management in `views/templates/admin/configure.tpl`

   ```html{4-23}
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

7. Display the checkout modal when your user click on the plan selection button

   ```javascript{6,10-11,25,50-81}
    window?.psaccountsVue?.init();

    let billingContext = { ...window.psBillingContext.context }
    let currentModal;
    let customer;
    let hasSubscription = false;

    if(window.psaccountsVue.isOnboardingCompleted() == true) {

      // Then the plan selection should be displayed
      updateBillingCustomerDisplay();

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
      updateBillingCustomerDisplay();
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
        case window.psBilling.EVENT_HOOK_TYPE.BILLING_INITIALIZED:
          if(data.subscription) {
            hasSubscription = true;
          }
          break;
        case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_UPDATED:
          hasSubscription = true;
          break;
      }
      updateBillingCustomerDisplay();
    }

    // Display plan selection or ps billing, based on the existence of a subscription or not
    function updateBillingCustomerDisplay() {
      if(hasSubscription) {
        document.getElementById('billing-plan-selection').style.display = 'none';
        document.getElementById('ps-billing-wrapper').style.display = 'block';
      } else {
        document.getElementById('billing-plan-selection').style.display = 'block';
        document.getElementById('ps-billing-wrapper').style.display = 'none';
      }
    };

    // Open the checkout full screen modal
    function openCheckout(pricingId) {
      const offerSelection = {offerSelection: {offerPricingId: pricingId }};
      onOpenModal(window.psBilling.MODAL_TYPE.SUBSCRIPTION_FUNNEL, offerSelection);
    };
   ```

<!-- TODO: add information about the plan-billing components -->

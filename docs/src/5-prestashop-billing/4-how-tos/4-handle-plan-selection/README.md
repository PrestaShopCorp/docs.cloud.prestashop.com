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
          /**
          * If values have been submitted in the form, process.
          */
          if (((bool)Tools::isSubmit('submit<module_name>Module')) == true) {
              $this->postProcess();
          }

          /*********************
          * PrestaShop Account *
          * *******************/
          $accountsService = null;

          try {
              $accountsFacade = $this->getService('<module_name>.ps_accounts_facade');
              $accountsService = $accountsFacade->getPsAccountsService();
          } catch (\PrestaShop\PsAccountsInstaller\Installer\Exception\InstallerException $e) {
              $accountsInstaller = $this->getService('<module_name>.ps_accounts_installer');
              $accountsInstaller->install();
              $accountsFacade = $this->getService('<module_name>.ps_accounts_facade');
              $accountsService = $accountsFacade->getPsAccountsService();
          }

          try {
              Media::addJsDef([
                  'contextPsAccounts' => $accountsFacade->getPsAccountsPresenter()
                      ->present($this->name),
              ]);

              // Retrieve the PrestaShop Account CDN
              $this->context->smarty->assign('urlAccountsCdn', $accountsService->getAccountsCdn());

          } catch (Exception $e) {
              $this->context->controller->errors[] = $e->getMessage();
              return '';
          }

          /**********************
           * PrestaShop Billing *
           * *******************/
          // Billing Service
          $componentItems = [];
          try {
              // Load service for PrestaShop Billing
              $billingService = $this->getService('<module_name>.ps_billings_service');
              $productComponents = $billingService->getProductComponents();
              if (!empty($productComponents['body']['items']))
              {
                  $componentItems = $productComponents['body']['items'];
              }
          } catch (Exception $e) {
              $this->context->controller->errors[] = $e->getMessage();
              return '';
          }

          // Billing Context
          try {
              $billingFacade = $this->getService('rbm_example.ps_billings_facade')
              $partnerLogo = $this->getLocalPath() . 'views/img/partnerLogo.png';

              Media::addJsDef($billingFacade->present([
                  'logo' => $partnerLogo,
                  'tosLink' => 'https://yoururl/',
                  'privacyLink' => 'https://yoururl/',
                  'emailSupport' => 'you@email',
              ]));
          }
          catch (Exception $e) {
              $this->context->controller->errors[] = $e->getMessage();
              return '';
          }

          $this->context->smarty->assign([
            'urlBilling' => "https://unpkg.com/@prestashopcorp/billing-cdc/dist/bundle.js",
            'urlConfigureJs' => $this->getPathUri() . 'views/js/ configure.js',
            'componentItems' => $componentItems,
          ]);

          return $this->display(__FILE__, 'views/templates/admin/configure.tpl');
      }
   ```

2. Inject this file as a script in `views/templates/admin/configure.tpl`

   ```html{7}
   <prestashop-accounts></prestashop-accounts>
   <div id="ps-billing"></div>
   <div id="ps-modal"></div>

   <script src="{$urlAccountsCdn|escape:'htmlall':'UTF-8'}" rel=preload></script>
   <script src="{$urlBilling|escape:'htmlall':'UTF-8'}" rel=preload></script>
   <script src="{$urlConfigureJs|escape:'htmlall':'UTF-8'}" rel=preload></script>
   ```

3. Implement `views/js/configure.js` to make billing works with the component instead of the `initialize` method

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

4. Display your plan in your module and hide the subscription management in `views/templates/admin/configure.tpl`

   ```html{4-23}
      <prestashop-accounts></prestashop-accounts>

      <!-- You should use the billing plan library in order to display your plan -->
      <section id="billing-plan-selection" style="display:none">
        <h2>Select your plan</h2>
        <div style="width: 500px; display:flex">
          {foreach $componentItems as $item}
            <div style="border: 1px solid;padding: 2rem;text-align:center;margin-left:1rem;">
              <h3 style="font-weight: bold;margin-bottom: 1rem;">{$item['id']}</h3>

              <!-- Pricing information must be retrieved from billing API -->
              <p style="margin-bottom: 1rem;">{$item['price']/100}€/{$item['billingPeriodUnit']}</p>
              <!-- Pricing id must be retrieved from billing API -->
              <button onclick="openCheckout('{$item['id']}')"
                style="background: black;color: white; padding: 0.5rem; font-weight: bold;">Select this offer</button>
            </div>
          {/foreach}
        </div>
      </section>

      <div id="ps-billing-wrapper" style="display:none">
        <div id="ps-billing"></div>
      </div>
      <div id="ps-modal"></div>
   ```

5. Display the checkout modal when your user click on the plan selection button

   ```javascript{7,11,12,26,56,57,58,61,68-76,78-82}
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

<!-- ### Retrieve the pricing and pricing id (not available yet)

Please use the Billing API, as described in the API OpenAPI documentation

<!-- TODO: add information about the way to retrieve plans -->

<!-- ### Use billing plan library (not available yet)

Please use the Billing Plan library, as described in the README of the lib

<!-- TODO: add information about the plan-billing components -->

---
title: Tutorial
---

[[toc]]

# Tutorial

This tutorial will help you implement Prestashop Billing into your flat-fee priced module.

::: tip
If you're looking for the implementation of your Stairstep plan, follow this tutorial and go to our ["Implementing a Stairstep pricing model"](../4-how-tos/1-stairstep/README.md) tutorial next.
:::

:::tip Example module
An example module already integrating the components of the PrestaShop Integration Framework is available on [Github](https://github.com/PrestaShopCorp/builtforjsexample) to help you with development.
:::

## Implementing the `module-lib-billing` package in your module

`module-lib-billing` is an important part of the Prestashop Billing solution, as it helps you setup some needed information in a standardized format.

1. Edit the `config\admin\services.yml` file to include the following highlighted contents:

   ```yaml{31-54}
   services:
     _defaults:
       public: true

     ##############
     # Your Module

     <module_name>.module:
       class: <module_name>
       factory: ['Module', 'getInstanceByName']
       arguments:
         - '<module_name>'

     <module_name>.context:
       class: Context
       factory: ['Context', 'getContext']

     #####################
     # PrestaShop Account

     <module_name>.ps_accounts_installer:
       class: 'PrestaShop\PsAccountsInstaller\Installer\Installer'
       arguments:
         - '5.0'

     <module_name>.ps_accounts_facade:
       class: 'PrestaShop\PsAccountsInstaller\Installer\Facade\PsAccounts'
       arguments:
         - '@<module_name>.ps_accounts_installer'

     #####################
     # PrestaShop Billing

     <module_name>.ps_billings_context_wrapper:
       class: 'PrestaShopCorp\Billing\Wrappers\BillingContextWrapper'
       arguments:
       - '@<module_name>.ps_accounts_facade'
       - '@<module_name>.context'
       - true # if true, enables the sandbox mode, if false or empty, disables it

     <module_name>.ps_billings_facade:
       class: 'PrestaShopCorp\Billing\Presenter\BillingPresenter'
       public: true
       arguments:
       - '@<module_name>.ps_billings_context_wrapper'
       - '@<module_name>.module'

     # Remove this if you do not need BillingService
     <module_name>.ps_billings_service:
       class: 'PrestaShopCorp\Billing\Services\BillingService'
       public: true
       arguments:
       - '@<module_name>.ps_billings_context_wrapper'
       - '@<module_name>.module'
   ```

:::warning Sandbox Mode
During your development, you should set the sandbox mode to `true` (as shown in the code above), which allows you to use a test card. You can use `4111 1111 1111 1111` as a test card, or [see the official Chargebee documentation](https://www.chargebee.com/docs/2.0/chargebee-test-gateway.html#test-card-numbers).
:::

2. Make sure you replace every occurrence of `<module_name>` with the actual name of your module.

3. Edit the `composer.json` file to include the PrestaShop Billing library:

   ```json{19}
   {
     "name": "prestashop/<module_name>",
     "description": "",
     "config": {
       "preferred-install": "dist",
       "optimize-autoloader": true,
       "prepend-autoloader": false,
       "platform": {
           "php": "7.1"
       }
     },
     "require-dev": {
       "prestashop/php-dev-tools": "^4.2.1"
     },
     "require": {
       "php": ">=5.6",
       "prestashop/prestashop-accounts-installer": "^1.0",
       "prestashop/module-lib-service-container": "^1.4",
       "prestashopcorp/module-lib-billing": "^3.0.0"
     },
     "autoload": {
       "classmap": [
         "<module_name>.php"
       ]
     },
     "author": "PrestaShop",
     "license": "MIT"
   }
   ```

4. Run the `composer install --no-dev -o` command to implement the new dependency.

## Inject the PrestaShop Billing Context

You need to inject the `psBillingContext` into the `window.psBillingContext` global variable to initialize PrestaShop Billing related components.

1. Add the following highlighted contents to the `<module_name>.php` file:

   ```php{42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58}
       public function getContent()
       {
           /**
            * If values have been submitted in the form, process.
            */
           if (((bool)Tools::isSubmit('submit<module_name>Module')) == true) {
               $this->postProcess();
           }

           $this->context->smarty->assign('module_dir', $this->_path);

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

           // Load the context for PrestaShop Billing
           $billingFacade = $this->getService('<module_name>.ps_billings_facade');
           $partnerLogo = $this->getLocalPath() . 'views/img/partnerLogo.png';

           // PrestaShop Billing
           Media::addJsDef($billingFacade->present([
             'logo' => $partnerLogo,
             'tosLink' => 'https://yoururl/',
             'privacyLink' => 'https://yoururl/',
             // This field is deprecated, but must be provided to ensure backward compatibility
             'emailSupport' => ''
           ]));

           $this->context->smarty->assign('urlBilling', "https://unpkg.com/@prestashopcorp/billing-cdc/dist/bundle.js");

           $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');
           return $output;
       }
   ```

2. The presenter will serve some context informations. Set the following parameters:

   | Attribute    | Type   | Description                                                         |
   | ------------ | ------ | ------------------------------------------------------------------- |
   | logo         | string | Set your logo as a file (at the root of the module folder) or a URL |
   | tosLink      | string | Link to your terms & services (required)                            |
   | privacyLink  | string | Link to your privacy page (required)                                |
   | emailSupport | string | Email to your support (required)                                    |

## Edit the Template File

1. Access the template file allowing you to render the configuration page for your module in the back office (located by default at `views/templates/admin/configure.tpl`).

2. In the template file, add the following highlighted contents at the beginning:

   ```javascript{2,3}
   <prestashop-accounts></prestashop-accounts>
   <div id="ps-billing"></div>
   <div id="ps-modal"></div>
   ```

   :::tip
   The `ps-billing` and `ps-modal` divs are simple containers for our frontend components to inject themselves into your code. You can how they are used on the line `13` in the snippet below.
   :::

3. In the template file, add the following highlighted contents at the end:

   ```javascript{2,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32}
   <script src="{$urlAccountsCdn|escape:'htmlall':'UTF-8'}" rel=preload></script>
   <script src="{$urlBilling|escape:'htmlall':'UTF-8'}" rel=preload></script>

   <script>
       /*********************
       * PrestaShop Account *
       * *******************/
       window?.psaccountsVue?.init();

       // Check if Account is associated before displaying Billing component
       if(window.psaccountsVue.isOnboardingCompleted() == true)
       {
       	  /*********************
   	        * PrestaShop Billing *
   	        * *******************/
   	        window.psBilling.initialize(window.psBillingContext.context, '#ps-billing', '#ps-modal', (type, data) => {
   	    	      // Event hook listener
   	    	      switch (type) {
                   // Hook triggered when the subscription is created
   	    	          case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_CREATED:
   	    	              console.log('subscription created', data);
   	    	              break;
                   // Hook when the subscription is updated
   	    	          case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_UPDATED:
   	    	              console.log('subscription updated', data);
   		    	          break;
                   // Hook triggered when the subscription is cancelled
   	    	          case window.psBilling.EVENT_HOOK_TYPE.SUBSCRIPTION_CANCELLED:
   	        	          console.log('subscription cancelled', data);
   	        	          break;
   	    	      }
   	        });
       }
   </script>
   ```

   :::tip
   In the snippet above, you can see three "hooks". They are events that you can 'hook' into to implement some custom logic on your side. They are not linked to the webhook services we offer, which are the source of truth of your exchanges with PrestaShop Billing.
   :::

## Test Your Module

To test if PrestaShop Billing is loading successfully into your module:

1. Zip your module folder.

2. In the back office of your PrestaShop store, go to **Modules** > **Module Catalog**.

3. Click the **Upload a module** button and select your archive.

4. Click **Configure** in the pop-up window that displays.

   :arrow_right: Your module configuration page should contain the PrestaShop Billing plan selection pane under the PrestaShop Account one:

   ![PrestaShop Billing Plan Selection](/assets/images/billing/ps_billing_plan_selection.png)

## Responding to our webhooks

:::tip
For more details on our webhook system, you can see our [reference](../6-references/1-webhook/README.md) and [concept](../2-concepts/README.md#events) sections.
:::

The last step to start using PrestaShop Billing is to have in your systems some way to process the events we send via webhook during the [subscription lifecycle](../2-concepts/README.md#subscription-lifecycle).

In order to have everything running correctly, you must:

- Create a `POST` endpoint and communicate it to us: we will send our events regularly to this URL.
- Communicate us a `basic` token for us to add to every request we send to the aforementionned URL. This step and whitelisting our URL ensures that your integration with Billing is as secure as possible.
  - It takes the form of an additional `Authorization` header added to our webhook event requests:
  ```json
  {
    headers: {
      Authorization: Basic <token>
    }
  }
  ```
  - The IP address of the webhook system is `34.77.109.237`. You can protect your API by filtering calls which are not triggered from this IP address.
- Have a way to process these events on your side.
- Configure the webhook in PrestaShop Billing. **This is done manually for now.**

:::warning
Note that if your endpoint does not return a `2xx` HTTP status, our webhooks will be retried at exponential time intervals until a `2xx` HTTP response is received.
:::

## Next Steps

- Explore advanced topics such as:
  - [Stairstep pricing model](../4-how-tos/1-stairstep/README.md)
  - [Invoice Pane](../4-how-tos/2-display-invoice-pane/README.md)
  - [Cancellation workflow](../4-how-tos/3-customize-cancellation/README.md)
  - [Handle plan selection by yourself](../4-how-tos/4-handle-plan-selection/README.md)
  - [Retrieve customer's subscription](../4-how-tos/5-retrieve-subscription/README.md)
  - [Multiple billing periods](../4-how-tos/6-multiple-billing-period/README.md)

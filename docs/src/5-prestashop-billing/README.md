---
title: Integrating a Module with PrestaShop Billing
---

# :credit_card: Integrating a Module with PrestaShop Billing

## Prerequisites

To complete this procedure, you need to have already integrated your module with [PrestaShop Account](../3-prestashop-account/README.md).

:::warning Contact Us
Our team is here to help you get started with the implementation of PrestaShop Billing. Please [click here](https://meetings.hubspot.com/esteban-martin3/prestashop-new-framework-integration-meeting) to set up a meeting with us before proceeding with the integration of your module.
:::

## Install PrestaShop Billing

1. Edit the `config\admin\services.yml` file to include the following highlighted contents:
    
    ```yaml{31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54}
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

      <module_name>.installer:
        class: 'PrestaShop\PsAccountsInstaller\Installer\Installer'
        arguments:
          - '5.0'

      <module_name>.facade:
        class: 'PrestaShop\PsAccountsInstaller\Installer\Facade\PsAccounts'
        arguments:
          - '@<module_name>.installer'

      #####################
      # PrestaShop Billing

      ps_billings.context_wrapper:
        class: 'PrestaShopCorp\Billing\Wrappers\BillingContextWrapper'
        arguments:
        - '@ps_accounts.facade'
        - '@<module_name>.context'
        - true # if true, enables the sandbox mode, if false or empty, disables it

      ps_billings.facade:
        class: 'PrestaShopCorp\Billing\Presenter\BillingPresenter'
        public: true
        arguments:
        - '@ps_billings.context_wrapper'
        - '@<module_name>.module'

      # Remove this if you do not need BillingService
      ps_billings.service:
        class: 'PrestaShopCorp\Billing\Services\BillingService'
        public: true
        arguments:
        - '@ps_billings.context_wrapper'
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
        "prestashopcorp/module-lib-billing": "^1.3.1"
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

4. Run the `composer install` command to implement the new dependency.

## Edit the <module_name>.php File

### Inject the PrestaShop Billing Context

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
                $accountsFacade = $this->getService('ps_accounts.facade');
                $accountsService = $accountsFacade->getPsAccountsService();
            } catch (\PrestaShop\PsAccountsInstaller\Installer\Exception\InstallerException $e) {
                $accountsInstaller = $this->getService('ps_accounts.installer');
                $accountsInstaller->install();
                $accountsFacade = $this->getService('ps_accounts.facade');
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
            $billingFacade = $this->getService('ps_billings.facade');
            $partnerLogo = $this->getLocalPath() . ' views/img/partnerLogo.png';

            // PrestaShop Billing
            Media::addJsDef($billingFacade->present([
              'logo' => $partnerLogo,
              'tosLink' => 'https://yoururl/',
              'privacyLink' => 'https://yoururl/',
              'emailSupport' => 'you@email',
            ]));

            $this->context->smarty->assign('urlBilling', "https://unpkg.com/@prestashopcorp/billing-cdc/dist/bundle.js");

            $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');
            return $output;
        }
    ```

2. The presenter will serve some context informations. Set the following parameters:

    | Attribute           | Type   | Description                                                           |
    | ------------------- | ------ | --------------------------------------------------------------------- |
    | logo                | string | Set your logo as a file (at the root of the module folder) or a URL   |
    | tosLink             | string | Link to your terms & services (required)                              |
    | privacyLink         | string | Link to your terms & services (required)                              |
    | emailSupport        | string | Email to your support (required)                                      |

### Use BillingService to Retrieve Billing Data in PHP

As seen in the `services.yml` file, the PrestaShop Billing composer provides a BillingService:

```yaml
  ps_billings.service:
    class: PrestaShopCorp\Billing\Services\BillingService
    public: true
    arguments:
      - '@ps_billings.context_wrapper'
      - '@rbm_example.module'
```

If needed, you can retrieve this service and its data in the same way you retrieve the facade:

```php
// Load the service for PrestaShop Billing
$billingService = $this->getService('ps_billings.service');

// Retrieve the customer
$customer = $billingService->getCurrentCustomer();

// Retrieve the subscritpion for this module
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

## Edit the Template File

1. Access the template file allowing you to render the configuration page for your module in the back office (located by default at `views/templates/admin/configure.tpl`).

2. In the template file, add the following highlighted contents at the beginning:

    ```javascript{2,3}
    <prestashop-accounts></prestashop-accounts>
    <div id="ps-billing"></div>
    <div id="ps-modal"></div>
    ```

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
        } 
    </script>
    ```

## (Optional) Display the Invoice Pane

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
  window.psBilling.initializeInvoiceList(window.psBillingContext.context, '#ps-billing-invoice');
  ```

## Test Your Module

To test if PrestaShop Billing is loading successfully into your module:

1. Zip your module folder.

2. In the back office of your PrestaShop store, go to **Modules** > **Module Catalog**.

3. Click the **Upload a module** button and select your archive.

4. Click **Configure** in the pop-up window that displays.
    
    :arrow_right: Your module configuration page should contain the PrestaShop Billing plan selection pane under the PrestaShop Account one:

    ![PrestaShop Billing Plan Selection](/assets/images/billing/ps_billing_plan_selection.png)
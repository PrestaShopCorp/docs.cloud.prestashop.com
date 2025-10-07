---
title: Integrating a Module with PrestaShop CloudSync
---

# :arrows_counterclockwise: Integrating a Module with PrestaShop CloudSync

## Prerequisites

To complete this procedure, you need to have already integrated your module with [PrestaShop Account](../4-prestashop-account/README.md).

:::warning Contact Us
Our team is here to help you get started with the implementation of PrestaShop CloudSync.
:::

:::tip Example module
An example module already integrating the components of the PrestaShop Integration Framework is available on [Github](https://github.com/PrestaShopCorp/builtforjsexample) to help you with development.
:::

## Edit the <module_name>.php File

### Install PrestaShop EventBus

There is no dependency to add in the composer of your module to support PrestaShop EventBus and CloudSync features.

To download the PrestaShop EventBus module dependency, add the following highlighted contents to the `<module_name>.php` file:
    
```php{4,21,22,23,24,25,26,27,28,29,30,31}
<?php
// ...

use PrestaShop\PrestaShop\Core\Addon\Module\ModuleManagerBuilder;

if (!defined('_PS_VERSION_')) {
    exit;
}

$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (file_exists($autoloadPath)) {
    require_once $autoloadPath;
}

class <module_name> extends Module

    //...

    public function install()
    {
        /* CloudSync */
        $moduleManager = ModuleManagerBuilder::getInstance()->build();

        if (!$moduleManager->isInstalled("ps_eventbus")) {
            $moduleManager->install("ps_eventbus");
        } else if (!$moduleManager->isEnabled("ps_eventbus")) {
            $moduleManager->enable("ps_eventbus");
            $moduleManager->upgrade('ps_eventbus');
        } else {
            $moduleManager->upgrade('ps_eventbus');
        }

        return parent::install() &&
            $this->registerHook('header') &&
            $this->registerHook('displayBackOfficeHeader') &&
            $this->getService('<module_name>.ps_accounts_installer')->install();

    }
```

### Add context for the Merchant Sharing Consent CDC

To allow the merchant to share their data with your services, you have to pair your module with the Merchant Sharing Consent Cross Domain Component (CDC). To do so, you need to expose some context to your configuration page using the `PresenterService` of PrestaShop EventBus.

1. Add the following highlighted contents to the `<module_name>.php` file:

  ```php{11,39,40,41,42,43,44,45,46,47,48,49,50,51}
  public function getContent()
    {
        /**
         * If values have been submitted in the form, process them.
         */
        if (((bool)Tools::isSubmit('submit<module_name>Module')) == true) {
            $this->postProcess();
        }

        $this->context->smarty->assign('module_dir', $this->_path);
        $moduleManager = ModuleManagerBuilder::getInstance()->build();

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

            // Retrieve Account CDN
            $this->context->smarty->assign('urlAccountsCdn', $accountsService->getAccountsCdn());

        } catch (Exception $e) {
            $this->context->controller->errors[] = $e->getMessage();
            return '';
        }

        if ($moduleManager->isInstalled("ps_eventbus")) {
            $eventbusModule =  \Module::getInstanceByName("ps_eventbus");
            if (version_compare($eventbusModule->version, '1.9.0', '>=')) {

                $eventbusPresenterService = $eventbusModule->getService('PrestaShop\Module\PsEventbus\Service\PresenterService');

                $this->context->smarty->assign('urlCloudsync', "https://assets.prestashop3.com/ext/cloudsync-merchant-sync-consent/latest/cloudsync-cdc.js");

                Media::addJsDef([
                    'contextPsEventbus' => $eventbusPresenterService->expose($this, ['info', 'modules', 'themes'])
                ]);
            }
        }

        $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');
        return $output;
    }
  ```

2. Edit the required consents according to your needs (line 48 in the code above). You can use the follwing consents:

  - `info` (mandatory): The store technical data such as the version of PrestaShop or PHP (read only)
  - `modules` : The list of modules installed on the store (read only)
  - `themes` : The list of themes installed on the store (read only)
  - `carts`: Information about the shopping carts of the store (read only)
  - `carriers`: The characteristics of the carriers available on the store (read only)
  - `categories`: The list of product categories of the store (read only)
  - `currencies`: The list of currencies available in the store (read only)
  - `customers`: The anonymized list of the store customers (read only)
  - `employees`: The anonymized list of the store employees (read only)
  - `images`: The list of the store images (read only)
  - `manufacturers`: The list of the store brands (read only)
  - `orders`: Information about orders placed on the store (read only)
  - `products`: The list of products available on the store (read only)
  - `stocks`: The list of stocks and associated movements on the store (read only)
  - `stores`: The list of stores available on the store (read only)
  - `suppliers`: The list of suppliers available on the store (read only)
  - `taxonomies`: Advanced categories available on the store (read only)
  - `translations`: The list of translations in the store (read only)
  - `wishlists`: The anonymized wishlists of the customers (read only)

3. There is a lighter version of the consent component, if you want to use it, please adapt your `<module_name>.php` file.

```php{3,8}
class <module_name> extends Module {

    public $useLightMode;
    //...

    public function __construct() {
        //...
        $this->useLightMode = true;
        //...
    }
}
```

You should get the light consent component:

![PrestaShop CloudSync light pane](/assets/images/cloudsync/cloudsync-share-my-data-light.png)

## Edit the Template File

1. Access the template file allowing you to render the configuration page for your module in the back office (located by default at `views/templates/admin/configure.tpl`).

2. In the template file, add the following tag at the beginning:

  ```javascript
  <div id="prestashop-cloudsync"></div>
  ```

3. In the template file, add the following script lines at the end:

  ```javascript
  <script src="{$urlCloudsync|escape:'htmlall':'UTF-8'}"></script>

  <script>
      window?.psaccountsVue?.init();
		  // CloudSync
		  const cdc = window.cloudSyncSharingConsent;

	    cdc.init('#prestashop-cloudsync');
	    cdc.on('OnboardingCompleted', (isCompleted) => {
	      console.log('OnboardingCompleted', isCompleted);
	    });
	    cdc.isOnboardingCompleted((isCompleted) => {
	      console.log('Onboarding is already Completed', isCompleted);
	    });
  </script>
  ```

:::tip Note
If you prefer to set the rendering into another element, you can pass the `querySelector` to the init method as follows: `cdc.init("#consents-box")`
:::

:::tip Note
A callback function is available: it is called when the user gives their consent.
:::

## Test Your Module

To test if PrestaShop CloudSync is loading successfully into your module:

1. Zip your module folder.

2. In the back office of your PrestaShop store, go to **Modules** > **Module Catalog**.

3. Click the **Upload a module** button and select your archive.

4. Click **Configure** in the pop-up window that displays.
    
    :arrow_right: Your module configuration page should contain the PrestaShop CloudSync pane under the PrestaShop Account one:

    ![PrestaShop CloudSync pane](/assets/images/cloudsync/cloudsync-share-my-data.png)

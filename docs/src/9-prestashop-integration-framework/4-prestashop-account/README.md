---
title: Integrating a Module with PrestaShop Account
---

# :passport_control: Integrating a Module with PrestaShop Account

## Prerequisites

To complete this procedure, you need to have at your disposal a running PrestaShop store (see [Preparing your environment](../../3-preparing-your-environment)) and a module that you can either [create yourself](https://devdocs.prestashop-project.org/8/modules/creation/) or [generate](https://validator.prestashop.com/generator).

:::warning Warning
Integrating your module will require using [PHP](https://www.php.net/) for the backend. In the following procedure, we used [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) for the frontend, but you can also choose to use [Vue.js 3](https://vuejs.org/) or [React](https://fr.reactjs.org/), according to your preference.
:::

:::tip Example module
An example module already integrating the components of the PrestaShop Integration Framework is available on [Github](https://github.com/PrestaShopCorp/builtforjsexample) to help you with development.
:::

**You are responsible to check that the module is installed**

## Install PrestaShop Account 

To use the ps_accounts integration, you must ensure the module is both installed and enabled.

To do this, you can use [module-lib-mbo-installer](https://github.com/PrestaShopCorp/module-lib-mbo-installer)


## Edit the <module_name>.php File

:::tip Note
For simplification, all PHP methods listed below are created in the `<module_name>.php` file.
Feel free to reorganize the code structure in a different way to match your module evolution.
:::


### Load PsAccountsPresenter

The presenter will give basic informations to the components through `contextPsAccounts` object accessible on the page.

```php
// My_module.php

// /!\ TODO: Starting here you are responsible to check that the module is installed

/** @var Ps_accounts $module */
$modulePsAccounts = \Module::getModuleIdByName('ps_accounts');

/** @var \PrestaShop\Module\PsAccounts\Presenter\PsAccountsPresenter $presenter */
$presenter = $modulePsAccounts->getService(\PrestaShop\Module\PsAccounts\Presenter\PsAccountsPresenter::class);

Media::addJsDef([
    'contextPsAccounts' => $presenter->present((string) $this->name),
]);

return $this->display(__FILE__, 'views/templates/admin/app.tpl');
```

## Edit the Template File

1. Access the template file allowing you to render the configuration page for your module in the back office. If your module was created through the [generator](https://validator.prestashop.com/generator), it has the following path: `views/templates/admin/configure.tpl`. Create it if necessary.

2. In the `<module_name>.php` file, make sure your template file's path matches the one defined in this line:

    ```php
    /** @var Ps_accounts $module */
    $modulePsAccounts = \Module::getModuleIdByName('ps_accounts');

    $this->context->smarty->assign('urlAccountsCdn', $modulePsAccounts->getParameter('ps_accounts.accounts_cdn_url'));

    $this->context->smarty->assign('psAccountsInitParams'=> $modulePsAccounts->getService(\PrestaShop\Module\PsAccounts\Service\PsAccountsService::class)->getComponentInitParams());
    
    // To be removed if you force the latest version of ps_accounts (possible with module-lib-mbo-installer)
    if(version_compare($modulePsAccounts->version, "8", "<")) {
        $presenter = $modulePsAccounts->getService(\PrestaShop\Module\PsAccounts\Presenter\PsAccountsPresenter::class);

        Media::addJsDef([
            'contextPsAccounts' => $presenter->present((string) $this->name),
        ]);
    }

    $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');
    ```

3. In the template file, add the following tag at the beginning:

    ```javascript
    <prestashop-accounts></prestashop-accounts>
    ```

4. In the template file, add the following script lines at the end:

    ```javascript
    <script src="{$urlAccountsCdn|escape:'htmlall':'UTF-8'}" rel=preload></script>

    <script>
        /*********************
        * PrestaShop Account *
        * *******************/
        window?.psaccountsVue?.init({$psAccountsInitParams|json_encode});
    </script>
    ```

## Check the status of PrestaShop Account

With version 8 of the ps_accounts module, the module's status is divided into three parts on the PHP :
- The shop has an identity -> `$accountsService->isShopIdentityCreated()`
- The shop is verified -> `$accountsService->isShopIdentityVerified()`
- The shop has a point of contact -> `$accountsService->isShopPointOfContactSet()`

On the client side, a JavaScript function is available :
- The `window.psaccountsVue.isOnboardingCompleted()`

This functions allow you to **check PrestaShop Account status **:

They will return `true` if it's ok, and `false` if not.

You can use either of these functions to prevent the merchant from proceeding with the module configuration until they have done the configuration of ps_accounts. While the PHP function provides stricter security, the JavaScript one allows you to customize the display.

### :bulb: Example
For example, you can use the following code in the template file to gray out the configuration pane until the onboarding is done:

```javascript{7,8,9,10}
<script>
    /*********************
    * PrestaShop Account *
    * *******************/
    window?.psaccountsVue?.init();

    if(window.psaccountsVue.isOnboardingCompleted() != true)
    {
    	document.getElementById("module-config").style.opacity = "0.5";
    }
</script>
```
This code will create the following output:

![Grayed configuration pane](/assets/images/accounts/ps_account_grayed_settings.png)

## Test Your Module

To test if PrestaShop Account is loading successfully into your module:

1. Zip your module folder.

2. In the back office of your PrestaShop store, go to **Modules** > **Module Catalog**.

3. Click the **Upload a module** button and select your archive.

4. Click **Configure** in the pop-up window that displays.
    
    :arrow_right: Your module configuration page should contain the PrestaShop Account configuration panel:

    ![PrestaShop Account verified](/assets/images/accounts/ps_accounts_verified.png)
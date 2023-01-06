---
title: Integrating a Module with PrestaShop Account
---

# :passport_control: Integrating a Module with PrestaShop Account

## Prerequisites

To complete this procedure, you need to have at your disposal a running PrestaShop (see [Preparing your environment](https://docs.cloud.prestashop.com/2-preparing-your-environment)) and a module that you can either [create yourself](https://devdocs.prestashop-project.org/8/modules/creation/) or [generate](https://validator.prestashop.com/generator).

:::warning Warning
The backend of a module integrated with PrestaShop Cloud Services is made of [PHP](https://www.php.net/) while the frontend is made of [Vue.js 3](https://vuejs.org/), Vanilla JavaScript, or React. You need to master these languages to be able to perform the integration.
:::

## Backend

### Composer

Make sure [Composer](https://getcomposer.org/) is installed on your machine.

At the root of your module folder, create a `composer.json` file with the following contents:

```json{13,14}
{
    "name": "prestashop/<module_name>",
    "description": "",
    "config": {
        "preferred-install": "dist",
        "optimize-autoloader": true,
        "prepend-autoloader": false
    },
    "require-dev": {
        "prestashop/php-dev-tools": "^4.2.1"
    },
    "require": {
        "php": ">=5.6",
        "prestashop/prestashop-accounts-installer": "^1.0.1",
        "prestashop/module-lib-service-container": "^1.4"
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

### Register Your Module and PrestaShop Account as Services

First, you need to register your module and PrestaShop Account as services. 

:::tip Note
For more information about services, see the [related documentation](https://devdocs.prestashop.com/1.7/modules/concepts/services/).
:::

At the root of your module folder, create a `config` folder containing a `common.yml` file with the following contents:

```yaml
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
  ps_accounts.installer:
    class: 'PrestaShop\PsAccountsInstaller\Installer\Installer'
    arguments:
      - '5.0'

  ps_accounts.facade:
    class: 'PrestaShop\PsAccountsInstaller\Installer\Facade\PsAccounts'
    arguments:
      - '@ps_accounts.installer'
```

### Edit the <module_name>.php file

:::tip Note
For simplification, all PHP methods listed below are created in the `<module_name>.php` file.
Feel free to re-organize the code structure in a different way to match the module evolution.
:::

Modify the `<module_name>.php` file as follows:

```php
<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

require 'vendor/autoload.php';

class <module_name> extends Module

{
    /**
     * @var ServiceContainer
     */
    private $container;

    public function __construct()
    {

        $this->name = 'rmb_example';
        $this->tab = 'advertising_marketing';
        $this->version = '1.0.0';
        $this->author = 'Prestashop';
        $this->emailSupport = 'support@prestashop.com';
        $this->need_instance = 0;
        $this->ps_versions_compliancy = [
            'min' => '1.6.1.0',
            'max' => _PS_VERSION_,
        ];
        $this->bootstrap = true;
        parent::__construct();
        $this->displayName = $this->l('Account example');
        $this->description = $this->l('This is an example for a module using Prestashop Accounts.');
        $this->confirmUninstall = $this->l('Are you sure to uninstall this module?');
        $this->uri_path = Tools::substr($this->context->link->getBaseLink(null, null, true), 0, -1);
        $this->images_dir = $this->uri_path . $this->getPathUri() . 'views/img/';
        $this->template_dir = $this->getLocalPath() . 'views/templates/admin/';

        if ($this->container === null) {
            $this->container = new \PrestaShop\ModuleLibServiceContainer\DependencyInjection\ServiceContainer(
                $this->name,
                $this->getLocalPath()
            );
        }
    }

    /**
     * Retrieve service
     *
     * @param string $serviceName
     *
     * @return mixed
     */
    public function getService($serviceName)
    {
        return $this->container->getService($serviceName);
    }

    // The following installs PrestaShop Account on your module installation
    public function install()
    {
        return parent::install() &&
            $this->getService('ps_accounts.installer')->install();
    }

    public function uninstall()
    {
        if (!parent::uninstall()) {
            return false;
        }

        return true;
    }

    /**
     * Get the Tos URL from the context language, if null, send default link value
     *
     * @return string
     */
    public function getTosLink($iso_lang)
    {
        switch ($iso_lang) {
            case 'fr':
                $url = 'https://www.prestashop.com/fr/prestashop-account-cgu';
                break;
            default:
                $url = 'https://www.prestashop.com/en/prestashop-account-terms-conditions';
                break;
        }

        return $url;
    }

    /**
     * Get the Tos URL from the context language, if null, send default link value
     *
     * @return string
     */
    public function getPrivacyLink($iso_lang)
    {
        switch ($iso_lang) {
            case 'fr':
                $url = 'https://www.prestashop.com/fr/politique-confidentialite';
                break;
            default:
                $url = 'https://www.prestashop.com/en/privacy-policy';
                break;
        }

        return $url;
    }

    public function getContent()
    {
        $accountsService = null;
        try {
            $accountsFacade = $this->getService('ps_accounts.facade');
            $accountsService = $accountsFacade->getPsAccountsService();
        } catch (\PrestaShop\PsAccountsInstaller\Installer\Exception\InstallerException $e) {
            // Prestashop Account is not installed, we use accountsInstaller to automatically install it

            $accountsInstaller = $this->getService('ps_accounts.installer');
            $accountsInstaller->install();
            $accountsFacade = $this->getService('ps_accounts.facade');
            $accountsService = $accountsFacade->getPsAccountsService();
        }

        try {
            // The context needed for PrestaShop Account to work
            Media::addJsDef([
                'contextPsAccounts' => $accountsFacade->getPsAccountsPresenter()
                    ->present($this->name),
            ]);

            // Retrieve Account CDN
            $this->context->smarty->assign('urlAccountsVueCdn', $accountsService->getAccountsCdn());

            // The path of your js build (optionnal)
            $this->context->smarty->assign('pathVendor', $this->getPathUri() . 'views/js/chunk-vendors-<module_name>.' . $this->version . '.js');
            $this->context->smarty->assign('pathApp', $this->getPathUri() . 'views/js/app-<module_name>.' . $this->version . '.js');
        } catch (Exception $e) {
            $this->context->controller->errors[] = $e->getMessage();
            return '';
        }
        
        return $this->context->smarty->fetch($this->template_dir . 'rmb_example.tpl');
    }
}
```

> You should follow the documentation from [prestashop-accounts-installer](https://github.com/PrestaShopCorp/prestashop-accounts-installer) to properly install the PS Account utility.

### Check the PrestaShop Account Association

To know whether the shop has been successfully associated or not, use the `isAccountLinked` function from the `PsAccountsService` service.

```php
// Account
$accountsService = $this->getService('ps_accounts.facade')->getPsAccountsService();
$accountsService->isAccountLinked();
```

### Load the Front JavaScript App

You should load the bundle of the front JS app in the `getContent` hook of your module PHP file. See [Compile your app](#compile-your-app) to get the correct path.

```php
// Update the path to have the proper path
$this->context->smarty->assign('pathVendor', $this->getPathUri() . 'views/js/chunk-vendors-rbm_example.' . $this->version . '.js');
$this->context->smarty->assign('pathApp', $this->getPathUri() . 'views/js/app-rbm_example.' . $this->version . '.js');
```

```php
<?php

if (!defined('_PS_VERSION_')) {
    exit;
}

require 'vendor/autoload.php';

class Rbm_example extends Module
{
    private $emailSupport;

    /**
     * @var ServiceContainer
     */
    private $container;

    public function __construct()
    {
        $this->name = 'rbm_example';
        $this->tab = 'advertising_marketing';
        $this->version = '1.0.0';
        $this->author = 'Prestashop';
        $this->emailSupport = 'support@prestashop.com';
        $this->need_instance = 0;

        $this->ps_versions_compliancy = [
            'min' => '1.6.1.0',
            'max' => _PS_VERSION_,
        ];
        $this->bootstrap = true;

        parent::__construct();

        $this->displayName = $this->l('RBM example');
        $this->description = $this->l('This is a RBM example module.');

        $this->confirmUninstall = $this->l('Are you sure to uninstall this module?');

        $this->uri_path = Tools::substr($this->context->link->getBaseLink(null, null, true), 0, -1);
        $this->images_dir = $this->uri_path . $this->getPathUri() . 'views/img/';
        $this->template_dir = $this->getLocalPath() . 'views/templates/admin/';

        if ($this->container === null) {
            $this->container = new \PrestaShop\ModuleLibServiceContainer\DependencyInjection\ServiceContainer(
                $this->name,
                $this->getLocalPath()
            );
        }
    }

    /**
     * Retrieve the service
     *
     * @param string $serviceName
     *
     * @return mixed
     */
    public function getService($serviceName)
    {
        return $this->container->getService($serviceName);
    }

    public function install()
    {
        return parent::install() &&
            $this->getService('ps_accounts.installer')->install();
    }

    public function uninstall()
    {
        if (!parent::uninstall()) {
            return false;
        }

        return true;
    }

    /**
     * Get the Tos URL from the context language, if null, send default link value
     *
     * @return string
     */
    public function getTosLink($iso_lang)
    {
        switch ($iso_lang) {
            case 'fr':
                $url = 'https://www.prestashop.com/fr/prestashop-account-cgu';
                break;
            default:
                $url = 'https://www.prestashop.com/en/prestashop-account-terms-conditions';
                break;
        }

        return $url;
    }

    /**
     * Get the Tos URL from the context language, if null, send default link value
     *
     * @return string
     */
    public function getPrivacyLink($iso_lang)
    {
        switch ($iso_lang) {
            case 'fr':
                $url = 'https://www.prestashop.com/fr/politique-confidentialite';
                break;
            default:
                $url = 'https://www.prestashop.com/en/privacy-policy';
                break;
        }

        return $url;
    }

    public function getContent()
    {
        // Allow to auto-install Account
        $accountsInstaller = $this->getService('ps_accounts.installer');
        $accountsInstaller->install();

        try {
            // Account
            $accountsFacade = $this->getService('ps_accounts.facade');
            $accountsService = $accountsFacade->getPsAccountsService();
            Media::addJsDef([
                'contextPsAccounts' => $accountsFacade->getPsAccountsPresenter()
                    ->present($this->name),
            ]);

            // Retrieve Account CDN
            $this->context->smarty->assign('urlAccountsCdn', $accountsService->getAccountsCdn());

            $billingFacade = $this->getService('ps_billings.facade');
            $partnerLogo = $this->getLocalPath() . 'views/img/partnerLogo.png';

            // Billing
            Media::addJsDef($billingFacade->present([
                'logo' => $partnerLogo,
                'tosLink' => $this->getTosLink($this->context->language->iso_code),
                'privacyLink' => $this->getPrivacyLink($this->context->language->iso_code),
                'emailSupport' => $this->emailSupport,
            ]));

            $this->context->smarty->assign('pathVendor', $this->getPathUri() . 'views/js/chunk-vendors-rbm_example.' . $this->version . '.js');
            $this->context->smarty->assign('pathApp', $this->getPathUri() . 'views/js/app-rbm_example.' . $this->version . '.js');
        } catch (Exception $e) {
            $this->context->controller->errors[] = $e->getMessage();

            return '';
        }

        return $this->context->smarty->fetch($this->template_dir . 'rbm_example.tpl');
    }
}
````

### Create the Module Template

Create the global vue app template in `views/templates/admin/<module_name>.tpl`. The name should match the name defined in this line of the `<module_name>.php` file:

```php
return $this->context->smarty->fetch($this->template_dir . '<module_name>.tpl');
```

This file will load the Vue app frontend and the chunk vendor js

The 3 `$urlAccountsCdn`, `$pathVendor` and `$pathApp` variables are prepared in the `getContent` hook.

```html
<link href="{$pathVendor|escape:'htmlall':'UTF-8'}" rel=preload as=script>
<link href="{$pathApp|escape:'htmlall':'UTF-8'}" rel=preload as=script>
<link href="{$urlAccountsCdn|escape:'htmlall':'UTF-8'}" rel=preload as=script>

<div id="app"></div>

<script src="{$pathVendor|escape:'htmlall':'UTF-8'}"></script>
<script src="{$pathApp|escape:'htmlall':'UTF-8'}"></script>
<script src="{$urlAccountsCdn|escape:'htmlall':'UTF-8'}" type="text/javascript"></script>
```

## Frontend

:::tip About VueJS
Javascript and Vue knowledge are prerequisite (cf [https://vuejs.org/v2/guide/](https://vuejs.org/v2/guide/)). This section only introduces the essentials, for more information, see the [example of PrestaShop Cloud Services integrated module](https://github.com/PrestaShopCorp/partner-devtools.prestashop.com/tree/main/modules/rbm_example) or the [Using VueJS PrestaShop documentation](https://devdocs.prestashop.com/1.7/modules/concepts/templating/vuejs/).
:::


### Getting started

Create a `_dev` folder in your module. This folder will contain the VueJS app contained in your module. You can have only one app.

Access this folder, and then create a [VueJS project](https://cli.vuejs.org/guide/creating-a-project.html#vue-create).

:::tip Note
Feel free to organize your application in your own way.
:::

```bash
# Create the Vue app
cd _dev
vue create <app's name>
```

### Compile Your App

You need to update or create the `vue.config.js` to compile properly your VueJS app. The `outputDir` should change, depending on your module structure. Don't forget to change the `<module_name>` in the output filename path.

This is only an example of `vue.config.js`, you may modify this configuration.

::: warning Chunk path
These file names must match the ones (`$pathVendor`, `$pathApp`) used in the `getContent` hook, and the version of this module PHP (cf composer.json) and the Vue app (cf package.json) must be the same.
:::

```js
const webpack = require("webpack");
const path = require("path");
const fs = require('fs');
const packageJson = fs.readFileSync('./package.json')
const version = JSON.parse(packageJson).version || 0
module.exports = {
    parallel: false,
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                cash: "cash-dom",
            }),
        ],
        output: {
            filename: `js/app-rbm_example.${version}.js`,
            chunkFilename: `js/chunk-vendors-rbm_example.${version}.js`
        }
    },
    chainWebpack: (config) => {
        config.plugins.delete("html");
        config.plugins.delete("preload");
        config.plugins.delete("prefetch");
        config.resolve.alias.set("@", path.resolve(__dirname, "src"));
    },
    css: {
        extract: false,
    },
    runtimeCompiler: true,
    productionSourceMap: false,
    filenameHashing: false,
    outputDir: "../../views/", // Outputs in module views folder
    assetsDir: "",
    publicPath: "../modules/<module_name>/views/",
};
```

### Add the Required Dependencies

```bash
yarn add @prestashopcorp/billing-cdc
```

Optional see [PsAccount component fallback](#psaccount-component-fallback)

```bash
yarn add prestashop_accounts_vue_components
```

### Use PrestaShop Account

The `PsAccount` front component is loaded by the CDN in the smarty template.

::: warning Use the CDN
CDN is the proper way to implement PrestaShop Cloud Services. You should use only the npm dependency as a fallback in case the CDN does not work properly
:::

```html
<prestashop-accounts>
    // your module template goes here
</prestashop-accounts>
```

```js
<script>
    /**
      * The PsAccountsVueComponents can be used in any technology (reactjs, vuejs, native...).
      * It is mounted via the <prestashop-accounts> tag.
      * If the CDN is loaded, then init via the CDN for automatic update.
      * If the CDN di not work, load it from the installed npm repository.
    **/
    window?.psaccountsVue?.init() || require('prestashop_accounts_vue_components').init();
</script>
```
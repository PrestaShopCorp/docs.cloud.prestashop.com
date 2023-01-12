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

### Install PrestaShop Account

1. If needed, install [Composer](https://getcomposer.org/).
2. Open the command line of your choice.
2. Run this command to Install the PrestaShop Account package (available on [Packagist](https://packagist.org/packages/prestashop/prestashop-accounts-installer)):
    ```
    composer require prestashop/prestashop-accounts-installer
    ```
    :arrow_right: A `vendor` folder and a `composer.json` containing the PrestaShop Account dependency are created within the module folder.
3. To register your module and PrestaShop Account as services, create a `config\admin\service.yml` file with the following contents at the root of the module folder:
    
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

    :::tip Note
    For more information about services, see the [related documentation](https://devdocs.prestashop.com/1.7/modules/concepts/services/).
    :::

### Edit the <module_name>.php File

:::tip Note
For simplification, all PHP methods listed below are created in the `<module_name>.php` file.
Feel free to reorganize the code structure in a different way to match your module evolution.
:::

#### Set Up the Automatic Installation

Add the following highlighted contents to the `<module_name>.php` file.

They will allow your module to automatically install PrestaShop Account when necessary, and allow you to use PsAccountService.

```php{5,11,12,13,14,15,16,24,36,37,38,39,54,55,56,57,58}
class <module_name> extends Module {
    /**
     * @var ServiceContainer
     */
    private $container;

    public function __construct()
    {
        // ...

        if ($this->container === null) {
            $this->container = new \PrestaShop\ModuleLibServiceContainer\DependencyInjection\ServiceContainer(
                $this->name,
                $this->getLocalPath()
            );
        }
    }

    // ...
    public function install()
    {
        // Load the PrestaShop Account utility
        return parent::install() &&
            $this->getService('ps_accounts.installer')->install();
    }

    // ...

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
}
```

#### Inject the Library and Context

To function properly, PrestaShop Account requires some information which is provided by injecting a `context`. To do so, you need to update the `getContent` hook. This will inject `contextPsAccounts` into the browser `window` object (`window.contextPsAccounts`).

The PrestaShop Account service is also responsible for returning the proper URL for the frontend component, [which is loaded via CDN](#use-prestashop-account).

::: warning PrestaShop Account component doc
For a custom VueJS implementation, check [PsAccount vue component documentation](https://storybook-accounts.distribution.prestashop.net/)
:::

```php{14,15,16,17,18}
    public function getContent()
    {
        /**
         * If values have been submitted in the form, process them
         */
        if (((bool)Tools::isSubmit('submit<module_name>Module')) == true) {
            $this->postProcess();
        }
        ​
        $this->context->smarty->assign('module_dir', $this->_path);

        $output = $this->context->smarty->fetch($this->local_path.'views/templates/admin/configure.tpl');

        Media::addJsDef([
            'contextPsAccounts' => $this->getService('ps_accounts.facade')
                ->getPsAccountsPresenter()
                ->present($this->name),
        ]);

        return $output.$this->renderForm();
    }
```

### Make Sure the PrestaShop Account Service Loads Into Your Module

1. Zip your module folder.
1. In the back office of your PrestaShop store, go to **Modules** > **Module Catalog**.
3. Click the **Upload a module** button and select your archive.
    Your module is now available in the catalog.
4. Install it and click on **Configure**.
5. Right-click its configuration panel, and inspect the code.
    If `contextPsAccount` is present, the service was successfully loaded.

### Load the Front JavaScript App

You should load the bundle of the front JS app in the `getContent` hook of your module PHP file. See [Compile your app](#compile-your-app) to get the correct path.

```php
// Update the path to have the proper path
$this->context->smarty->assign('pathVendor', $this->getPathUri() . 'views/js/chunk-vendors-rbm_example.' . $this->version . '.js');
$this->context->smarty->assign('pathApp', $this->getPathUri() . 'views/js/app-rbm_example.' . $this->version . '.js');
```

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
      * If the CDN did not work, load it from the installed npm repository.
    **/
    window?.psaccountsVue?.init() || require('prestashop_accounts_vue_components').init();
</script>
```
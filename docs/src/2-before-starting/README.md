---
title: Before Starting
---

# :flight_departure: Before Starting

Before starting to develop your module, explore the different tools available, and learn about the rules and good practices you will need to follow to be able to pass our technical validation when you submit your module.


![Onboarding flow for Built For PrestaShop](/assets/images/before-starting/onboarding-flow.png)

##  Available Tools

### Module Generator

The [Module Generator](https://validator.prestashop.com/generator) allows you to save time. Choose your module type and follow the instructions: a skeleton module is then automatically generated to help with the creation of your module.

### Module example

An example module containing the 3 components of the PrestaShop Integration Framework is available on [Github](https://github.com/PrestaShopCorp/builtforjsexample) to help you with your developments.

### Dependencies manager
1. Add a module_dependencies.json file

```json
    {
        "dependencies": [
          {
            "name" : "ps_accounts"
          },
          {
            "name" : "ps_eventbus"
          }
        ]
    }
```

2. In composer.json, replace the old version by "prestashop/module-lib-mbo-installer": "^3.0"
```json{17}
    {
      "name": "prestashop/builtforjsexample",
      "description": "",
      "config": {
        "preferred-install": "dist",
        "optimize-autoloader": true,
        "prepend-autoloader": false,
        "platform": {
          "php": "7.2"
        }
      },
      "require": {
        "php": ">=7.2",
        "prestashop/prestashop-accounts-installer": "^1.0",
        "prestashop/module-lib-service-container": "^1.4",
        "prestashopcorp/module-lib-billing": "^3",
        "prestashop/module-lib-mbo-installer": "^3.0"
      },
      "autoload": {
        "classmap": [
          "builtforjsexample.php"
        ]
      },
      "author": "PrestaShop",
      "license": "MIT"
    }
```

3. In the main PHP file, you should load the dependencies manager
```php
$mboInstaller = new \Prestashop\ModuleLibMboInstaller\DependencyBuilder($this);
if( !$mboInstaller->areDependenciesMet() )
{
    $dependencies = $mboInstaller->handleDependencies();
    $this->smarty->assign('dependencies', $dependencies);
    return $this->display(__FILE__, 'views/templates/admin/dependency_builder.tpl');
}
```

4. Add the template file 'views/templates/admin/dependency_builder.tpl'
```smarty
<!-- Load cdc library -->
<script src="https://assets.prestashop3.com/dst/mbo/v1/mbo-cdc-dependencies-resolver.umd.js"></script>

<!-- cdc container -->
<div id="cdc-container"></div>

<script defer>
  const renderMboCdcDependencyResolver = window.mboCdcDependencyResolver.render
  const context = {
    ...{$dependencies|json_encode},
    onDependenciesResolved: () => location.reload(),
    onDependencyResolved: (dependencyData) => console.log('Dependency installed', dependencyData), // name, displayName, version
    onDependencyFailed: (dependencyData) => console.log('Failed to install dependency', dependencyData),
    onDependenciesFailed: () => console.log('There are some errors'),
  }
  renderMboCdcDependencyResolver(context, '#cdc-container')
</script>
```

You can use the example module to extract the lines of code and files needed for integration.


### Method Search Engine

A [Method Search Engine](https://validator.prestashop.com/guide/) is available within the Validator to help you work out which methods are available for the various versions of PrestaShop.

### Validator

The [Validator](https://validator.prestashop.com) is a tool created to check if your module is compatible with PrestaShop technical requirements. You can:

- upload a zip,
- or specify the URL of your [GitHub](https://help.github.com/articles/create-a-repo/) repository (which has to be public).

The Validator then automatically creates a detailed report explaining what needs to be improved/changed in your module. By following this report, you can submit your module error-free.

:::warning Important  
PrestaShop uses the PSR-2 norm. We recommend you follow it, it will not prevent your module from passing the validation if you do not. To know more, read [this blog article](https://build.prestashop-project.org/news/prestashop-moves-to-psr-2/).
:::

## Preparing for Technical Validation

Modules need to undergo a validation process before being added to the PrestaShop Marketplace. Follow these recommendations to ensure quick validation once your module is ready.

### Development Mode

You can create and test your module on any environment (Windows with WampServer, local Linux, Docker, etc.). The important thing to remember is to **always** enable the display of error messages.

To make this easier, PrestaShop features a Dev Mode, which allows you to display PHP error messages. You can enable the Dev Mode in two different ways:  
- From your back office, go to **Advanced Parameters** > **Performance**, and enable the **Debug mode** option.
- In the `config` folder of your PrestaShop store, open the `defines.inc.php` file. At the very start of the file, set `_PS_MODE_DEV_` to `true` (the default value is `false`):

    ```php
    <?php
    define('_PS_MODE_DEV_', true);
    ```
:::warning Important
Production stores must not be used in Dev Mode.
:::

### Good Practices

Before starting the development of your module, make sure you are familiar with our [good practices](https://devdocs.prestashop-project.org/8/modules/creation/good-practices/).

### Validation Checklist

Before starting the development of your module, you can also anticipate by taking a look at the [validation checklist](https://devdocs.prestashop-project.org/1.7/modules/sell/techvalidation-checklist/).



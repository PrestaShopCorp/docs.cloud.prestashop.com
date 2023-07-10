---
title: Before Starting
---

# :flight_departure: Before Starting

Before starting to develop your module, explore the different tools available, and learn about the rules and good practices you will need to follow to be able to pass our technical validation when you submit your module.


![Onboarding flow for Built For PrestaShop](/assets/images/before-starting/onboarding-flow.png){#.book-meeting#}

##  Available Tools

### Module Generator

The [Module Generator](https://validator.prestashop.com/generator) allows you to save time. Choose your module type and follow the instructions: a skeleton module is then automatically generated to help with the creation of your module.

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



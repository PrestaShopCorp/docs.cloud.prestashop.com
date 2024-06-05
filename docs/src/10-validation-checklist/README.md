---
title: Validation Checklist
---

# Validation Checklist

When a module is submitted for technical validation, it must first pass the [validator](https://validator.prestashop.com). Some issues will lead to an automatic rejection.

Then, the technical team will make sure the following rules have been followed.

## Common Rules

### The module structure is followed

The module respected the [expected structure](https://devdocs.prestashop-project.org/8/modules/creation/module-file-structure/).

### PHP files are executed in PrestaShop context

To ensure that PHP files are executed in the PrestaShop context, you must add the following code to the beginning of all PHP files, with the exception of CRON or Ajax files.

```php
if (!defined('_PS_VERSION_')) {
    exit;
}
```

:::tip Note
To ensure that your module passes automatic validation, please follow the syntax above.
:::

### PrestaShop version Compliancy is declared

You have to declare the compliancy of your module with PrestaShop versions in the __construct function of your module.
```php
public function __construct()
    {
        $this->name = '<modulename>';
        $this->tab = 'administration';
        $this->version = '1.0.0';
        $this->author = 'PrestaShop';

        ...

        $this->displayName = $this->l('Example Module Name');
        $this->description = $this->l('Example Module Description');

        $this->ps_versions_compliancy = array('min' => '1.7', 'max' => _PS_VERSION_);
    }
```

### Core tables are untouched

Module may create all the tables they need in the database. However, altering a core table is forbidden.

If you want to add columns to an existing table, the workaround is to create a new table with a foreign key targetting the primary key of the core table.

### Other modules are not altered

Modifying core or other modules files is not allowed.

### The module does not rely on external assets

The zipped module you submitted must be totally self-sufficient. All the contents needed by the module to work properly must be present in the archive. No external contents should be downloaded by the module after installation.

### The archive contains only one module

Modules embedded in another one are difficult to review and cannot have their own release process. All modules must be uploaded to the PrestaShop Marketplace separately, even if they only work together.

### Code is written in english

PrestaShop provides e-commerce software ready use in many languages. The code and displayed texts are written in English, then translated if the user switches to another language.

In the same way, the code submitted to the PrestaShop Marketplace has to be written in English, even if the only user of this code is likely to come from only one country or speak one language. A lang unknown by the reviewer will make validation impossible.

### Code in hooks is run only when needed

Several hooks are called on all pages of the back office or front office. When a module is registered on one of them, it may impact the page performance on low-end servers if it runs too much code.

We ask you to keep the code running in your hooks light, and filter the pages you module runs on if necessary.

Examples:

- Module filtering the creation of orders from another module:

    ```php
        <?php
        /**
         * Hook executed at the order confirmation
         */
        public function hookOrderConfirmation($params)
        {
            # If created by another module, return
            if ($params['order']->module !== $this->name) {
                return false;
            }

        // [...]
        }
    ```

- Filter for a hook called on all BO pages:

    ```php
        <?php
        /**
         * Display content ONLY in the admin payment controller
         */
        public function hookDisplayAdminAfterHeader()
        {
            $currentController = $this->context->controller->controller_name;
            if ('AdminPayment' !== $currentController) {
                return false;
            }

            // [...]
            // return $this->display(...)
        }
    ```

### Documentation is provided

Documentation is found in the `docs/` folder of the module, and in a format widly used (PDF is recommended, avoid ZIP files which need an additional process of extraction).

### Functional review

#### No PHP errors are thrown in debug mode

A module must be tested on a Prestashop store with debug mode enabled in order to spot the slightest error.
Validation teams always have this mode enabled and if an alert is raised, the module will be rejected.

On production mode, only PHP errors will be detected as they prevent the page to be fully executed. On development mode, all other levels of messages such as notices and warnings are triggered.

### Payment Modules Rules

We have extra rules for Payment Modules as this type of modules require higher security.
Note that there are some modules which create the Order with a pending order status during the payment processing (1), while others wait for the payment system's approval to create it (2). But none of them create an order before the customer passed the payment service (bank, PayPal...).

- Make sure you double check the `id_cart` before creating the order. The purpose is to make sure another customer cannot validate a cart which is not theirs.

- if (2), make sure the amount you use for `validateOrder()` comes from the external payment system. Do not use `Cart->getOrderTotal();`.
    :::tip Note
    For security reasons, always proceed as explained.
    :::

- For (2), when receiving a call to process the payment, make sure you double check the source of the call using a signature or a token. Those values must not be known of all.

## Security

### SQL requests variables are sanitized

We examine every SQL request to make sure you cast your variables.

- Use `pSQL()` for strings.

    Use this:
    ```php
    $sql = 'SELECT * FROM ' . DB_PREFIX . 'webservice_account WHERE description = "' . pSQL($this->description). '"';
    ```
    instead of this:
    ```php
    $sql = 'SELECT * FROM ' . DB_PREFIX . 'webservice_account WHERE description = "' . $this->description . '"';
    ```

- Use `(int)` for integers.

    Use this:
    ```php
    $sql = 'SELECT * FROM ' . DB_PREFIX . 'orders WHERE id_order = ' . (int)$this->order;
    ```
    instead of this:
    ```php
    $sql = 'SELECT * FROM ' . DB_PREFIX . 'orders WHERE id_order = ' . $this->id_order ;
    ```

- Use `array_map` for arrays.

    Use this:
    ```php
    ($excluded_products ? (' AND p.id_product not in ('.join(',', implode(', ', array_map('intval', $excluded_products))).')') : '') .
    ```
    instead of this:
    ```php
    ($excluded_products ? (' AND p.id_product not in ('.join(',', $excluded_products).')') : '') .
    ```   

    If the list of values is a list of strings, don't forget to implode it with quote or double quote, like this
    ```php
    IN ('" . implode("','", array_map('pSQL', explode(',', $arrayOfStrings )).'")
    ``` 

- Use `bqSQL()` for table's name or field's name.

    Use this:
    ```php
    $sql = 'SELECT * FROM `' . DB_PREFIX . bqSQL($table).'`';
    ```
    instead of this:
    ```php
    $sql = 'SELECT * FROM `' . DB_PREFIX . $table.'`';
    ``` 

More details:
- [Using the DBQuery class](https://devdocs.prestashop-project.org/8/development/components/database/dbquery/)
- [Executing your SQL requests](https://devdocs.prestashop-project.org/8/development/components/database/db/)

### No unsafe methods are used

Using `serialize()` / `unserialize()` is forbidden, as they is a security risk if you do not control the data going through these methods. They may lead to remote code execution, so we recommend using `json_encode()` / `json_decode()` instead.

### An `.htaccess` file exists in the root folder of the module

To prevent someone from listing the files of the module, and direct execution of PHP files, an `.htaccess` file must be present in the root folder.

:::warning IMPORTANT
:warning: If you use cron.php or ajax.php files in your module, you should use a front controller to manage this instead: [see documentation here](https://devdocs.prestashop-project.org/8/modules/concepts/controllers/front-controllers/#using-a-front-controller-as-a-cron-task).
:::

Example :
 ```htaccess
# Apache 2.2
<IfModule !mod_authz_core.c>
    <Files *.php>
    order allow,deny
    deny from all
    </Files>
</IfModule>

# Apache 2.4
<IfModule mod_authz_core.c>
    <Files *.php>
    Require all denied
    </Files>
</IfModule>
```

:::tip Note
If your module creates log or debug files, you must also prevent them from being accessed from the internet by creating a rule in the .htaccess file. You can load them from a back-office page by loading them in PHP, or the merchant can retrieve them from their FTP.
:::

### Smarty variables are escaped

All the Smarty variables present in TPL files have to be escaped, to avoid malicious code to be displayed.

Use this for HTML tag :
```smarty
{$variable|escape:'htmlall':'UTF-8'}
```

instead of this:
```smarty
{$variable}
```

Use this for inline Javascript :
```smarty
{$variable|escape:'javascript':'UTF-8'}
```

instead of this:
```smarty
{$variable}
```

::: warning
:warning: In some cases, you will have to use `{$var nofilter}` to escape your variables. See [Smarty documentation](https://www.smarty.net/docs/en/variable.escape.html.tpl). This is strongly discouraged, and will be analysed on a case-by-case basis by our teams. This may pose security problems (XSS vulnerability).
:::

### An `index.php` file exists in each folder

To prevent someone from reaching the content of a repository, an `index.php` file must be present in each folder.

As we deal with [security risks](https://devdocs.prestashop-project.org/8/modules/creation/#keeping-things-secure) in some environments, we strongly recommend you comply with this rule. An ["autoindex" tool](https://github.com/jmcollin/autoindex) allows you to add one in each folder.

:::tip Note
This rule does not apply to the vendor/ folder and its subfolders, which are managed by composer.
:::

### Deleting a file when updating a module

If, during an update of the module, a file is no longer required and is therefore deleted, PrestaShop will not do this automatically. You must anticipate this by using the `unlink()` function in the update file. See documentation [here](https://devdocs.prestashop-project.org/8/modules/creation/enabling-auto-update/) about modules update.

### :new: Header CSP declaration
If your service uses external dependencies, we recommend that you declare the domains of these dependencies in a `header_csp.txt` file, separating the different domains declared by semicolons (` ; `). This file is necessary to ensure enhanced security on the servers of the merchants who will be using your module, by enabling effective CSP headers to be set up by the hosting and facilities management services.
```text
domaine-1.com;www.domaine-2.fr;domaine-3.net
```

## Best practices

### The license is supported

A module and its dependencies must be compatible with the OSL (core) and AFL (modules and themes) licenses used to manage and distribute the PrestaShop open source project. Supported licences are:

- Apache license
- AFL
- MIT
- BSD
- ISC
- EUPL

Additionally, distribution licenses like CC-0 or CC-by-sa are appropriate for artwork (e.g: icons, pictures, fonts, but not only).

### Files are stored in the proper directory

Module may add/modify some files on the store. To avoid issues with file permissions, we recommend storing files in the `var/%env%` directory. If you want to store files in the module folder, you must ensure that the rights are correct, and inform the merchants if this is not the case, so that they can make the necessary arrangements.

### Using iframes is restricted to highly secure websites

Although they are implemented in different parts of the core, as in [Payment Modules](https://github.com/PrestaShop/paymentexample/blob/master/paymentexample.php#L150), iframes are highly discouraged for security reasons.

With an iframe, contents can be loaded from a site that is not controlled by the PrestaShop app. The same problem occurs when authorizing to load JavaScript files from an external source. If the source is hacked, the attacker can potentially exploit other vulnerabilities to take control of all the stores where the module is installed.

Therefore, the technical team will check your processes, to ensure the security of the contents that will be injected by this iframe into the stores. They will check why an iframe is needed for this use case and what measures were taken to prevent attacks.

### Support is provided through the PrestaShop Marketplace

When a module is published on the PrestaShop Marketplace, we provide a unique way for all customers to get updates and support. Inserting links to an external platform might make things easier for sellers, but it would prevent us from helping customers and/or sellers in case of dispute. This only applies to paid modules.

### Calls from external services are secured

If you used PHP files to handle ajax or external calls, make sure to secure them. To do so, create a unique token during the module installation and use it during the call verification.

### HTML code is Written in templates files

Use Smarty/Twig templates to display HTML code to respect PrestaShop patterns (MVC architecture) and build a code that is easy to maintain.

For more details on how to display contents, see [this page](https://devdocs.prestashop-project.org/8/modules/creation/displaying-content-in-front-office/).

### The risk of conflicts between modules is low

#### Configuration keys

Configuration data is shared between the store and every module installed. This is convenient if your need to get a value from another part of the store, but there are some risks involved if two modules store data in the same key.

Too avoid conflicts, configuration keys must be prefixed with the module name. For instance, using a configuration key in the `Module_Name` module look like this:

```php
<?php
Configuration::get('MODULE_NAME_PAYMENT_METHODS_ORDER');
Configuration::updateValue('MODULE_NAME_PAYMENT_METHODS_ORDER', [...]);
```

instead of this:

```php
<?php
Configuration::get('PAYMENT_METHODS_ORDER');
Configuration::updateValue('PAYMENT_METHODS_ORDER', [...]);
```

#### Classes

This also applies to classes defined outside a namespace.
Having the module name as a prefix will reduce the risk of colision between classes.

### AJAX/Cron Tasks are secured and in A Controller

All the AJAX and Cron files must be protected with a unique and secured token to avoid any security issues (outside attacks,...). Even front controllers must be secured with a token when you use AJAX in them.

AJAX and Cron scripts must be placed in a controller and not in a separate script to call on its own.

For more details:

* [Documentation](https://devdocs.prestashop-project.org/8/modules/concepts/controllers/front-controllers/#using-a-front-controller-as-a-cron-task)
* [Original issue leading to the use of ModuleFrontControllers](https://github.com/PrestaShop/PrestaShop/issues/14648)

### Debug statements have been cleaned

All the debug tests have to be removed.

Example: `var_dump($a)`, `dump($a)`, `console.log(‘a’)`...

### Commented code has been removed

For the code to be easier to maintain/review, you must remove the commented lines of code. Code comments are welcome of course!

Commented code to be removed:

```php
<?php
    public function hookPaymentOptions($params)
    {
        // if (false === $this->active) { // <-- never called, to be removed
        //     return false;
        // }
        if (false === $this->merchantIsValid()) {
            return false;
        }
        // if (false === $this->checkCurrency($params['cart'])) // {
        //     return false;
        // }
        // if (false === $this->isPaymentStep()) {
        //     return false;
        // }

        // [...]
        return $payment_options;
    }
```

Encouraged code comments:

```php
<?php
    /**
     * Add payment option at the checkout in the front office
     *
     * @param array $params return by the hook
     *
     * @return array|false all payment option available
     */
    public function hookPaymentOptions($params)
    {
        // [...]
        return $payment_options;
    }
```

### Empty and generated files have been removed

As they have no consequences in the module execution, empty files can be removed before submission.
Generated files such as log files, invoice or other documents in PDFs etc. should be removed as well, as they:

* increase the weight of your submissions,
* add a risk of overwritten files when deployed on a shop,
* are not needed to run the module,
* could contain personal information.
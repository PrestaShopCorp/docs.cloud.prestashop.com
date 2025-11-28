# Technical Development Standards
:::warning VERY IMPORTANT
**The latest major PrestaShop version (V9.0.0) was launched on June 2025** and its adoption is crucial for PrestaShop ecosystem to continue thriving.

👉 **All new products must be compatible** to the latest PrestaShop version available, otherwise the submissions will be automatically rejected by PrestaShop Validation team.

👉 **For all existing products, from February 1st 2026**, all update submissions will be rejected by PrestaShop Validation team if the product is not already compatible with the latest PrestaShop version.
:::

## 🚨 Mandatory Technical Rules

These rules are **non-negotiable**. Failure to comply will result in automatic rejection.

### Core Module Structure

#### 🚨 Module Structure Compliance

```php
my_module/
├── config.xml
├── my_module.php (main module file)
├── index.php (directory protection)
├── views/
│   ├── index.php
│   ├── templates/
│   └── js/
├── controllers/
├── override/ (if absolutely necessary)
├── docs/ (documentation)
└── .htaccess (security protection)

```

#### 🚨 PrestaShop Context Protection
Every PHP file must include this security check:

```php
<?php
if (!defined('_PS_VERSION_')) {
    exit;
}

```

#### 🚨 Version Compatibility Declaration
Precisely declare your module's compatibility:

```php
public function __construct()
{
    $this->name = 'my_module';
    $this->version = '1.0.0';
    $this->author = 'Your Company';

    // Critical: Declare exact compatibility range
    $this->ps_versions_compliancy = array(
        'min' => '8.0.0',
        'max' => '9.99.99' // Never use _PS_VERSION_ here
    );

    parent::__construct();
}
```

### Database and Core Integrity

#### 🚨 Core Tables Untouchable
Never alter PrestaShop core database tables:

```php
// ❌ FORBIDDEN: Altering core tables
ALTER TABLE ps_customer ADD COLUMN my_field VARCHAR(255);

// ✅ CORRECT: Create your own table with foreign key
CREATE TABLE ps_my_module_data (
    id_customer INT UNSIGNED NOT NULL,
    my_field VARCHAR(255),
    PRIMARY KEY (id_customer),
    FOREIGN KEY (id_customer) REFERENCES ps_customer(id_customer) ON DELETE CASCADE
);

```

#### 🚨 No Module Interference
Never modify other modules or core files:

```php
// ❌ FORBIDDEN: Modifying other modules
include_once(_PS_MODULE_DIR_.'other_module/other_module.php');
$other_module = new OtherModule();
$other_module->some_method = 'modified'; // NEVER DO THIS

// ✅ CORRECT: Use hooks to interact
$this->context->hook->exec('actionMyModuleProcess', array('data' => $my_data));

```

### Code Quality Standards

#### 🚨 Debug Mode Compatibility
Your module must produce zero errors, warnings, or notices when debug mode is enabled:

```php
// Test your module with these settings:
define('_PS_MODE_DEV_', true);
ini_set('display_errors', 'on');
error_reporting(E_ALL);

```

#### 🚨 English Language Requirement
All code, comments, and default text must be in English:

```php
// ✅ CORRECT: English comments and code
/**
 * Process customer registration data
 * @param array $customer_data Customer information
 * @return bool Success status
 */
public function processCustomerRegistration($customer_data)
{
    // Validate email format
    if (!Validate::isEmail($customer_data['email'])) {
        return false;
    }
    // Process registration...
}

// ❌ FORBIDDEN: Non-English comments
/**
 * Traite les données d'inscription client
 */

```

## Security Requirements

Security is **paramount** in the PrestaShop ecosystem. Every module is scanned for vulnerabilities:

### SQL Injection Prevention

#### 🚨 All SQL Variables Must Be Sanitised

```php
// ✅ CORRECT: String sanitization
$sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'orders`
        WHERE `reference` = "' . pSQL($reference) . '"';

// ✅ CORRECT: Integer sanitization
$sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'orders`
        WHERE `id_order` = ' . (int)$id_order;

// ✅ CORRECT: Array sanitization
$product_ids = array_map('intval', $product_ids);
$sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'product`
        WHERE `id_product` IN (' . implode(',', $product_ids) . ')';

// ✅ CORRECT: Table/field name sanitization
$table = bqSQL($table_name);
$sql = 'SELECT * FROM `' . _DB_PREFIX_ . $table . '`';

// ❌ FORBIDDEN: Unsanitized variables
$sql = 'SELECT * FROM `' . _DB_PREFIX_ . 'orders`
        WHERE `reference` = "' . $reference . '"'; // DANGEROUS!

```

### XSS Prevention in Templates

#### 🚨 Escape All Smarty Variables

```
{* ✅ CORRECT: HTML content escaping *}
<div class="content">{$user_content|escape:'htmlall':'UTF-8'}</div>

{* ✅ CORRECT: JavaScript variable escaping *}
<script>
    var userData = '{$user_data|escape:'javascript':'UTF-8'}';
</script>

{* ✅ CORRECT: URL parameter escaping *}
<a href="link.php?param={$parameter|escape:'url'}">Link</a>

{* ❌ FORBIDDEN: Unescaped variables *}
<div>{$user_content}</div> <!-- XSS VULNERABILITY! -->

```

### File Security Protection

#### 🚨 Directory Protection
Every directory must contain an index.php file:

```php
<?php
// index.php content for directory protection
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache');
header('Location: ../');
exit;

```

#### 🚨 .htaccess Protection
Root module directory must contain .htaccess:

```
# Module root .htaccess
# Apache 2.4
<IfModule mod_authz_core.c>
    <Files *.php>
        Require all denied
    </Files>
</IfModule>

# Apache 2.2
<IfModule !mod_authz_core.c>
    <Files *.php>
        Order allow,deny
        Deny from all
    </Files>
</IfModule>

```

### AJAX and External Call Security

#### 🚨 Secure Token Implementation

```php
class MyModuleFrontController extends ModuleFrontController
{
    public function __construct()
    {
        parent::__construct();

        // Generate and verify security token
        if (!$this->verifyToken()) {
            die('Access denied');
        }
    }

    private function verifyToken()
    {
        $expected_token = Tools::hash($this->module->name . Configuration::get('MY_MODULE_SECRET'));
        $received_token = Tools::getValue('token');

        return hash_equals($expected_token, $received_token);
    }
}

```

### Dangerous Methods Prohibition

#### 🚨 Forbidden Functions

```php
// ❌ FORBIDDEN: serialize/unserialize (RCE risk)
$data = serialize($user_input); // DANGEROUS!
$object = unserialize($user_data); // EXTREMELY DANGEROUS!

// ✅ CORRECT: Use JSON instead
$data = json_encode($user_input, JSON_HEX_TAG | JSON_HEX_AMP);
$object = json_decode($user_data, true);

// ❌ FORBIDDEN: eval() function
eval($user_code); // NEVER USE THIS!

// ❌ FORBIDDEN: Unrestricted file operations
file_get_contents($_GET['file']); // Path traversal risk!
include($_POST['file']); // RCE risk!

```

## Performance Guidelines

### Hook Optimization

#### ⚠️ Lightweight Hook Implementation
Hooks are called on every page load. Optimize performance:

```php
// ✅ OPTIMIZED: Early exit for irrelevant contexts
public function hookDisplayAdminAfterHeader()
{
    // Exit early if not the target controller
    if ($this->context->controller->controller_name !== 'AdminProducts') {
        return '';
    }

    // Only load assets when needed
    $this->context->controller->addJquery();
    $this->context->controller->addJS($this->_path . 'js/admin-products.js');

    return $this->display(__FILE__, 'admin-header.tpl');
}

// ❌ INEFFICIENT: Processing on every page
public function hookDisplayAdminAfterHeader()
{
    // This runs on EVERY admin page - wasteful!
    $products = Product::getProducts($this->context->language->id, 0, 100);
    $this->context->smarty->assign('products', $products);
    return $this->display(__FILE__, 'admin-header.tpl');
}

```

### Database Optimization

#### ✅ Efficient Query Patterns

```php
// ✅ OPTIMIZED: Single query with joins
$sql = 'SELECT o.*, c.firstname, c.lastname
        FROM `' . _DB_PREFIX_ . 'orders` o
        LEFT JOIN `' . _DB_PREFIX_ . 'customer` c ON (o.id_customer = c.id_customer)
        WHERE o.date_add >= "' . pSQL($date_from) . '"
        AND o.date_add <= "' . pSQL($date_to) . '"
        LIMIT 0, 50';

// ❌ INEFFICIENT: Multiple queries in loop
foreach ($orders as $order) {
    $customer = new Customer($order['id_customer']); // N+1 query problem!
}

```

### Asset Management

#### ✅ Conditional Asset Loading

```php
// In module constructor
public function __construct()
{
    // ... other initialization ...

    // Only register assets for relevant pages
    if (Tools::getValue('controller') === 'product') {
        $this->context->controller->registerStylesheet(
            'module-mymodule-product',
            'modules/' . $this->name . '/views/css/product.css',
            ['media' => 'all', 'priority' => 150]
        );
    }
}

```

## Module Architecture Best Practices

### Configuration Management

#### ✅ Namespaced Configuration Keys
Prevent conflicts with other modules:

```php
// ✅ CORRECT: Prefixed configuration keys
Configuration::updateValue('MYMODULE_API_KEY', $api_key);
Configuration::updateValue('MYMODULE_WEBHOOK_URL', $webhook_url);
Configuration::updateValue('MYMODULE_ENABLED_FEATURES', json_encode($features));

// ❌ CONFLICT RISK: Generic keys
Configuration::updateValue('API_KEY', $api_key); // Could conflict!
Configuration::updateValue('ENABLED', true); // Too generic!

```

### Override Minimisation

#### ⚠️ Use Hooks Instead of Overrides
Overrides are the primary source of module conflicts:

```php
// ✅ PREFERRED: Hook-based approach
public function hookDisplayProductAdditionalInfo($params)
{
    $product = $params['product'];
    $additional_info = $this->getAdditionalProductInfo($product['id_product']);

    $this->context->smarty->assign([
        'additional_info' => $additional_info,
        'product' => $product
    ]);

    return $this->display(__FILE__, 'product-additional-info.tpl');
}

// ⚠️ USE SPARINGLY: Override only when absolutely necessary
// override/classes/Product.php
class Product extends ProductCore
{
    // Only override if no hook exists for your specific need
    // Document WHY this override is technically unavoidable
}

```

### Error Handling and Logging

#### ✅ Comprehensive Error Management

```php
public function processApiRequest($data)
{
    try {
        $response = $this->callExternalApi($data);

        if (!$response || isset($response['error'])) {
            throw new PrestaShopException('API call failed: ' . ($response['error'] ?? 'Unknown error'));
        }

        return $response;

    } catch (Exception $e) {
        // Log error for debugging
        PrestaShopLogger::addLog(
            'MyModule API Error: ' . $e->getMessage(),
            PrestaShopLogger::LOG_SEVERITY_LEVEL_ERROR,
            null,
            'MyModule',
            null,
            true
        );

        // Return graceful fallback
        return ['success' => false, 'message' => $this->l('Service temporarily unavailable')];
    }
}

```

## Theme Development Guidelines

### Hook Implementation Strategy

#### 🚨 Always Use Hooks, Never Hardcode
Themes must provide flexibility for module integration:

```
{* ✅ CORRECT: Hook-based integration *}
<div class="product-additional-info">
    {hook h='displayProductAdditionalInfo'}
</div>

{* ❌ FORBIDDEN: Hardcoded module template *}
{include file="modules/my_module/views/templates/hook/product-info.tpl"}

```

#### ✅ Smart Hook Output Checking
Prevent empty HTML structures:

```
{* ✅ OPTIMIZED: Check hook content before display *}
{capture name="product_tabs"}{hook h='displayProductTab'}{/capture}
{if !empty($smarty.capture.product_tabs|trim)}
    <div class="product-tabs-container">
        <ul class="nav nav-tabs">
            {$smarty.capture.product_tabs nofilter}
        </ul>
    </div>
{/if}

{* ❌ INEFFICIENT: Always render container *}
<div class="product-tabs-container">
    {hook h='displayProductTab'} {* Might be empty! *}
</div>

```

### Custom Hook Declaration

#### ✅ Register Custom Hooks in theme.yml

```yaml
global_settings:
  hooks:
    custom_hooks:
      - name: displayCustomProductBanner
        title: "Custom Product Banner"
        description: "Display promotional banner on product pages"
      - name: displayCheckoutExtraInfo
        title: "Checkout Additional Information"
        description: "Add extra information during checkout process"

    modules_to_hook:
      displayCustomProductBanner:
        - ps_banner
        - my_promotion_module

```

### Responsive Image Implementation

#### ✅ Modern Image Handling

```html
<!-- ✅ OPTIMIZED: Multiple format support with responsive sizing -->
<picture class="product-image">
    <source
        srcset="{$product.cover.bySize.large_default.sources.avif}"
        type="image/avif">
    <source
        srcset="{$product.cover.bySize.large_default.sources.webp}"
        type="image/webp">
    <img
        src="{$product.cover.bySize.large_default.url}"
        srcset="{$product.cover.bySize.medium_default.url} 768w,
                {$product.cover.bySize.large_default.url} 1200w"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        width="{$product.cover.bySize.large_default.width}"
        height="{$product.cover.bySize.large_default.height}"
        loading="lazy"
        alt="{$product.name}"
        class="img-fluid">
</picture>

```

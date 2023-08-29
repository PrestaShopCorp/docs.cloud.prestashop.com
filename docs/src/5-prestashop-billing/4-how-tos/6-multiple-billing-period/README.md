---
title: Multiple billing periods
---

[[toc]]

# Multiple billing periods

You may want to provide different billing periods to your customers, for example, to offer a discount for a yearly basis subscription to increase your customer commitment.

:::warning Attention
If you want to offer multiple billing periods you must [handle the plan selection by yourself](../4-handle-plan-selection/README.md) as this configuration is not handled by our plan selection screen.
:::

:::warning Attention
Solution Engineers at PrestaShop must enable multiple billing periods for your product. So please get in touch with them before starting your module implementation.
:::

## Supported billing periods

* monthly (`month`): your customer pay every month for your product, at each renewal a new invoice is generated.
* yearly (`year`): your customer pay once a year for your product, at each renewal a new invoice is generated.

:::tip Note
Currently, it's not possible to charge your customer on a monthly basis with annual commitment.
:::

## Import Puik into your module.

To follow the PrestaShop design guideline, you should import [Puik](https://www.npmjs.com/package/@prestashopcorp/puik) to your module. 

:::tip Note
In this guide, we will use the CSS version of the library, but you're allowed to use the Vue version.
:::

Import the CSS in `views/templates/admin/configure.tpl`

```html{4}
  <script src="{$urlAccountsCdn|escape:'htmlall':'UTF-8'}" rel=preload></script>
  <script src="{$urlBilling|escape:'htmlall':'UTF-8'}" rel=preload></script>
  <script src="{$urlConfigureJs|escape:'htmlall':'UTF-8'}" rel=preload></script>
  <link src="https://unpkg.com/@prestashopcorp/puik/dist/index.css" rel=preload as="style"/>
```


## Add Monthly / Yearly radio buttons

First of all, you should add the radio button in the HTML

```html{6-15}
  <prestashop-accounts></prestashop-accounts>

  <!-- You should use the billing plan library to display your plan -->
  <section id="billing-plan-selection" style="display:none">
    <h2>Select your plan</h2>
    <fieldset>
      <div class="puik-radio__group">
        <input class="puik-radio__input" type="radio" id="monthly" name="billingPeriod" value="monthly" checked />
        <label for="monthly">Monthly</label>
      </div>
      <div class="puik-radio__group">
        <input class="puik-radio__input" type="radio" id="yearly" name="billingPeriod" value="yearly" />
        <label for="yearly">Yearly</label>
      </div>
    </fieldset>
    <div style="width: 500px; display:flex">

    <!-- Plan display --> 
    </div>
  </section>
```

## Filter plans by billing period

As you will now retrieve monthly and yearly plans, you should want to only display plans with the selected billing period. We recommend to use CSS filters. Add a CSS class containing the billing period in the name, and hide yearly components.

```html{71,72}
<!-- You should use the billing plan library in order to display your plan -->
<section id="billing-plan-selection" style="display:none">
  <h2>Select your plan</h2>
  <div style="width: 500px; display:flex">
    {foreach $componentItems as $item}
      <div 
        class="billing-plan--{$item['billingPeriodUnit']}" 
        style="border: 1px solid;padding: 2rem;text-align:center;margin-left:1rem;{if $item['billingPeriodUnit'] == 'year'}display:none;{/if}">
        <h3 style="font-weight: bold;margin-bottom: 1rem;">{$item['name']}</h3>

        <!-- Pricing information must be retrieved from billing API -->
        <p style="margin-bottom: 1rem;">{$item['price']/100}€/{$item['billingPeriodUnit']}</p>
        <!-- Pricing id must be retrieved from billing API -->
        <button onclick="openCheckout('{$item['id']}')"
          style="background: black;color: white; padding: 0.5rem; font-weight: bold;margin-bottom: 1.5rem;">Select this
          offer</button>

        {if !empty($item['features'])}
          <div class="billing-plan__feature-group">
            {foreach $item['features'] as $feature}
              <div style="display: flex; flex-direction: row;">
                <div style="display: flex; flex-direction: row; align-items: flex-start;">
                  <div class="puik-icon material-icons-round" style="font-size: 1.25rem;">check</div>
                  <div>{$feature}</div>
                </div>
              </div>
            {/foreach}
          </div>
        {/if}
    {/foreach}
  </div>
</section>
```

## React when billing period changes

You should react when your customer clicks on billing period selection and hide the component which does not match the selected billing period.

```html{113n124}
<fieldset>
  <div class="puik-radio__group">
    <input 
      class="puik-radio__input"
      type="radio" 
      id="billing-period-unit-month" 
      name="billing-period-unit" 
      value="month" 
      checked 
      onclick="changeBillingPeriod('month')"
    />
    <label for="monthly">Monthly</label>
  </div>
  <div class="puik-radio__group">
    <input 
      class="puik-radio__input"
      type="radio"
      id="billing-period-unit-year"
      name="billing-period-unit"
      value="year"
      onclick="changeBillingPeriod('year')"
    />
    <label for="yearly">Yearly</label>
  </div>
</fieldset>
```

Here is an example of `changeBillingPeriod` implementation to display the plans according to the billing period. You should add this method in `views/js/configure.js`.

```javascript
/**
 * @param {("year"|"month")} period - Period selected by your customer 
 */
function changeBillingPeriod(period) {
  switch (period) {
    case 'year':
      changeDisplayForAllElements('billing-plan--month', 'none');
      changeDisplayForAllElements('billing-plan--year', 'block');
      break
    case 'month':
      changeDisplayForAllElements('billing-plan--year', 'none');
      changeDisplayForAllElements('billing-plan--month', 'block');
      break;
    default:
      console.error(`The selected period (period=${period}) can't be handled.`);
  }
}

/**
 * @param {string} cssSelector - CSS selector to select the elements to hide
 * @param {("block"|"none")} displayValue - Value to set in style.display, we only mention "block" and "none", but all valid value are allowed
 */
function changeDisplayForAllElements(cssSelector, displayValue) {
  const elements = document.querySelectorAll(cssSelector)
  elements.forEach((element) => {
    element.style.display = displayValue;
  });
}
```


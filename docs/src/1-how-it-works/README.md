---
title: How It Works
---

# :gear: How It Works

SaaS App allow Tech Partners and Sellers to create SaaS modules integrated within the PrestaShop ecosystem with a simple and unified onboarding for Merchants.

Subscriptions are managed and billed by the PrestaShop Billing system which pays back the module creator through an automatic monthly payment.

![SaaS App Schema](/assets/images/0-overview/schema.png)

## Building a SaaS App

The creation of a SaaS App requires to interract with PsAccount and PsBilling.

![SaaS App fully initialized](/assets/images/0-overview/rbm_fully_initialized.png)

### PrestaShop Account

PsAccount designate a tool suite to link a PrestaShop Module with the PrestaShop's Accounts. It allow you and PrestaShop to identify the merchant in the PrestaShop system. PsAccount is composed by:

- A module, which need to be installed on the shop. This installation is automatic.
- The PrestaShop's Accounts API for shop authentication and verification
- A frontend component required into your module's configuration page.

#### PsAccount component when your shop is not linked

![PsAccount not linked](/assets/images/0-overview/ps_account_not_linked.png)

#### PsAccount component when your shop is linked

![PsAccount linked](/assets/images/0-overview/ps_account_linked.png)

### PrestaShop Billing

PsBilling designate a tool suite to manage merchant subscription to your SaaS App. PsBilling is composed by:

- The Billing API wich store the subscription
- A frontend component required into your module's configuration page. this component is splitted in 2 main part: the merchant subscription panel, and the funnel modal

#### PsBilling without subscription

![PsBilling without subscription](/assets/images/0-overview/ps_billing_no_plan.png)

#### PsBilling with a subscription

![PsBilling with a subscription](/assets/images/0-overview/ps_billing_subscription.png)

#### PsBilling plan chooser in the funnel modal

![PsBilling with a subscription](/assets/images/0-overview/ps_billing_funnel_plans.png)

#### PsBilling subscription summary in the funnel modal

![PsBilling with a subscription](/assets/images/0-overview/ps_billing_funnel_summary.png)

## Relationships

### PrestaShop Account

For every merchant who has linked the ps account, an `ownerUuid`, an `ownerEmail` a `shopUuid` will be created. These values can be retrieved from the ps account context.

`ownerEmail`: the email of the SSO user from the [addons market place](https://addons.prestashop.com/en/)

`ownerUuid`: the identifier of the SSO user

`shopUuid`: the identifier of the Prestashop's shop

There are 2 distinct cases when updating the `ownerEmail`:

1. Changing email with the **same owner**: the `ownerEmail` is changed but the **`ownerUuid` stays the same**.

2. Changing email with a **different owner**: the shop's ownership is changed, for example: merchant A sells his/her shop to merchant B. In that case, the `ownerUuid` is based on the `ownerEmail`, it means that if the `ownerEmail` has been changed, the **`ownerUuid` will also be changed**.

### PrestaShop Billing

Relationship in Billing is a parent-child link between a "parent" customer and a "child" customer

The "parent" customer is created based on the `ownerUuid` of the SSO user from the addons market place whereas the "child" customer is created using the `shopUuid` of the Prestashop's shop.

![Relationship map](/assets/images/1-relationships/relationship_map.png)

For every shop using SaaS App module, a parent customer and a child customer will be created once, so does their relationship.

A merchant with the same `ownerUuid` (same SSO user, same parent customer) might have one or multiple shops with different `shopUuid` (different child customers).

![One customer to many shop](/assets/images/1-relationships/one_customer_multiple_shop.png)

And for each shop, the merchant can subscribe to one or more SaaS App modules.

:::warning

The subscription is attached to the shop (child customer).

:::

![Shop subscription](/assets/images/1-relationships/shop_subscription.png)

The payment method and the invoice are also attached to the shop (child customer).

The relationship can be found in the customer object.

```json
"customer": {
    "relationship": {
        "parent_id": "parent_id",
        "payment_owner_id": "child_id",
        "invoice_owner_id": "child_id",
        "root_id": "root_id",
    }
}
```

For now, there is only 2-levels of hierarchy: parent and child, so the `root_id` will be as same as `parent_id`.


As part of PrestaShop Cloud Services, PrestaShop Account allows merchants to associate a PrestaShop module with their PrestaShop Marketplace and PrestaShop Core accounts.

PrestaShop Account includes:

- A module integrated with PrestaShop Account, to be installed on the shop. The installation is automatic.
- The PrestaShop Account API allowing the shop authentication and verification.
- A frontend component required in the module's configuration page.
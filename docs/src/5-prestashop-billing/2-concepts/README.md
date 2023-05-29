---
title: Concepts
---

[[toc]]

# Concepts

## Context

The context is a central piece of data in the Prestashop Billing integration. We mostly use it to gather several key informations about your product, as well as the shop that uses it. Most of it comes from the `module-lib-billing` php package, and you can even see more informations about how it's constructed by browsing its [source code](https://github.com/PrestaShopCorp/module-lib-billing/blob/main/src/Presenter/BillingPresenter.php). Make sure you understand well its implementation [here](../3-tutorial/README.md#inject-the-prestashop-billing-context) and [here](../3-tutorial/README.md#edit-the-template-file) and how they interact.

:::tip
If you're not sure about some piece of code, do not hesitate to contact our team directly, we're here to help.
:::

## Subscription

A subscription allows Prestashop Billing to collect periodically the payment of your customer. At each subscription renewal, an invoice is generated. A subscription is linked to your module, a shop and a customer. A shop can only have one subscription to your module.

## Subscription Item

The subscription items are the pricing applied to the subscription with sometimes another information about the usage or the quantity which allow us to calculate the amount of this subscription for a billing period. The subscription item id matches the pricing id.

## Billing Period

The interval between 2 subscription renewals. It defines when an invoice will be generated. In our case it’s a month or a year.

## Shop

A shop is a PrestaShop store.

## Organisation

An organization is the person or the legal entity which owns the shop.

## Payment Method

A payment method designates the way a payment can be collected. Currently, Prestashop Billing offers payment via Credit Card or Paypal.

## Pricing models

Prestashop Billing currently supports two types of pricing models:

- Flat-Fee
- Stairstep

### Flat-Fee

Each plan has its own price point and contains a set of feature that do not change.

| Plan  | Price |
| ----- | ----- |
| Basic | 10€   |
| Team  | 15€   |
| Pro   | 20€   |

### Stair-step

The price of each step is assigned to a range of units. Those units can be anything, but some valid examples are the average revenue of a shop, or a number of products.

| Step    | Range            | Price |
| ------- | ---------------- | ----- |
| Step 01 | 01 - 10 units    | 10€   |
| Step 02 | 11 - 100 units   | 15€   |
| Step 03 | 101 - 1000 units | 20€   |
| Step 04 | 1001+ units      | 50€   |

The service tracks the range at which the customer currently is, and adjusts their plan accordingly, like so:

![Stair Step Schema](/assets/images/billing/stair-step-explanation.png)

Integrating Prestashop Billing with your Stair-step plans requires some extra steps that are detailed here.

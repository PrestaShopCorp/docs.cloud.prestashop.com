---
title: Concepts
---

[[toc]]

# Concepts

## Context

The context is a central piece of data in the Prestashop Billing integration. We mostly use it to gather key information about your product, as well as the shop that uses it. Most of it comes from the `module-lib-billing` PHP package. To know more on how it's built, browse its [source code](https://github.com/PrestaShopCorp/module-lib-billing/blob/main/src/Presenter/BillingPresenter.php). Make sure you understand well its implementation [here](../3-tutorial/README.md#inject-the-prestashop-billing-context) and [here](../3-tutorial/README.md#edit-the-template-file) and how they interact.

For a complete breakdown of the context, see our [reference page](../5-references/3-module-lib-billing/README.md#context).

:::tip
If you're not sure about some piece of code, do not hesitate to contact our team directly, we're here to help.
:::

## Events

### Webhook

When a change happens on the PrestaShop Billing API, you will be notified via a [webhook system](https://en.wikipedia.org/wiki/Webhook).
These events follow the subscription lifecycle below, and are detailed in our [reference](../5-references/1-webhook/README.md#).

### Subscription lifecycle

You can see here the lifecycle of a subscription for different use cases.

Subscription with trial
![lifecycle subscription with trial](/assets/images/3-webhook-events/lifecycle_subscription_with_trial.jpg)
Subscription without trial
![lifecycle subscription without trial](/assets/images/3-webhook-events/lifecycle_subscription_without_trial.jpg)
Subscription during trial
![lifecycle subscription during trial](/assets/images/3-webhook-events/lifecycle_cancellation_during_trial.jpg)
Plan change
![lifecycle plan change](/assets/images/3-webhook-events/lifecycle_plan_change.jpg)

## Subscription

A subscription allows Prestashop Billing to collect periodically the payment of your customer. At each subscription renewal, an invoice is generated. A subscription is linked to your module, a shop and a customer. A shop can only have one subscription to your module.

## Subscription Item

The subscription items are the pricing applied to the subscription with sometimes other information about the usage or the quantity which allow us to calculate the amount of this subscription for a billing period. The subscription item id matches the pricing id.

## Product

A product is what is sold, it can be a Built For PrestaShop, the PrestaShop Edition, or any other service. A product is defined by a unique ID, a description, a list of offers (could be 1) and is owned by one or many PrestaShop account / Organization. 

## Billing Period

The interval between 2 subscription renewals. It defines when an invoice will be generated. In our case it’s a month or a year.

## Shop

A shop is a PrestaShop store.

## Organization

An organization is the person or the legal entity which owns the shop.

## Payment Method

A payment method designates the way a payment can be collected. Currently, Prestashop Billing offers payment via Credit Card or Paypal.

## Pricing models

Prestashop Billing currently supports two types of pricing models:

- Flat fee
- Stairstep

### Flat fee

Each plan has its own price point and contains a set of features that do not change.

| Plan  | Price |
| ----- | ----- |
| Basic | 10€   |
| Team  | 15€   |
| Pro   | 20€   |

### Stairstep

The price of each step is assigned to a range of units. Those units can be anything, but some valid examples are the average revenue of a shop, or a number of products.

| Step    | Range            | Price |
| ------- | ---------------- | ----- |
| Step 01 | 01 - 10 units    | 10€   |
| Step 02 | 11 - 100 units   | 15€   |
| Step 03 | 101 - 1000 units | 20€   |
| Step 04 | 1001+ units      | 50€   |

The service tracks the range at which the customer currently is, and adjusts their plan accordingly, like so:

![Stairstep Schema](/assets/images/billing/stair-step-explanation.png)

Integrating Prestashop Billing with your stairstep plans requires some extra steps that are detailed here.

---
title: How It Works
---

# :gear: How It Works

## PrestaShop Cloud Services Architecture

![PrestaShop Cloud Services Architecture](/assets/images/1-relationships/architecture.jpg)

## PrestaShop Account 

### Components

PrestaShop Account is composed of:

- A module, which needs to be installed on the store (this installation is automatic),
- A frontend component to be added into your module's configuration page.

### Frontend Component

When a module is integrated with PrestaShop Account, a frontend component will display for the merchant in the module configuration page.

#### When the store is not linked:

![PrestaShop Account not linked](/assets/images/0-overview/ps_account_not_linked.png)

#### When the store is linked:

![PrestaShop Account linked](/assets/images/0-overview/ps_account_linked.png)

:::tip Note
Once a merchant has associated their account through the form, they will remain logged in permanently. If they performed the association when downloading a first PrestaShop Account integrated module, they will not need to do it again when downloading new ones.
:::

### Relationships

For every merchant who has linked the ps account, an `ownerUuid`, an `ownerEmail` a `shopUuid` will be created. These values can be retrieved from the PrestaShop Account context.

`ownerEmail`: Email address of the SSO user from the [PrestaShop Marketplace](https://addons.prestashop.com/en/)

`ownerUuid`: ID of the SSO user

`shopUuid`: ID of the PrestaShop store

:::tip Updating ownerEmail
There are two possibilities:

- The owner **stays the same**: `ownerEmail` is updated, but `ownerUuid` stays the same.

- The **owner changes**: The store's ownership changes, for example when a merchant sells their store to another merchant. In that case, `ownerEmail` and  `ownerUuid` both change.
:::

## PrestaShop Billing

### Components

PrestaShop Billing is composed of:

- The Billing API, wich stores the subscription,
- A frontend component to be added into your module configuration page, which includes the merchant subscription panel, and the funnel modal.

### Frontend Component

When a module is integrated with PrestaShop Billing, a frontend component will display for the merchant in the module configuration page.

#### Without a Subscription

![Without a subscription](/assets/images/0-overview/ps_billing_no_plan.png)

#### With a Subscription

![With a subscription](/assets/images/0-overview/ps_billing_subscription.png)

#### Plan Chooser in the Funnel Modal

![PrestaShop Billing with a subscription](/assets/images/0-overview/ps_billing_funnel_plans.png)

#### Subscription Summary in the Funnel Modal

![With a subscription](/assets/images/0-overview/ps_billing_funnel_summary.png)

### Relationships

Relationships in PrestaShop Billing are a parent-child link between a "parent" customer and a "child" customer.

The "parent" customer is created based on the `ownerUuid` of the SSO user from the [PrestaShop Marketplace](https://addons.prestashop.com/en/), while the "child" customer is created using the `shopUuid` of the PrestaShop store:

![Relationship map](/assets/images/1-relationships/relationship_map.png)

For every store using a PrestaShop Cloud Services module, a parent customer and a child customer are created once, and so is their relationship.

A merchant with the same `ownerUuid` (same SSO user, same parent customer) might have one or multiple stores with different `shopUuid` (different child customers):

![One customer to many stores](/assets/images/1-relationships/one_customer_multiple_shop.png)

For each store, a merchant can subscribe to one or more PrestaShop Cloud Services modules.

:::warning Important

The subscription, as well as the payment method and the invoice, are attached to the store (child customer).

:::

![Store subscription](/assets/images/1-relationships/shop_subscription.png)

The relationship can be found in the customer object:

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

There are only two levels of hierarchy: parent and child, so `root_id` is at the same level as `parent_id`.

## PrestaShop CloudSync

### Data Flow

PrestaShop CloudSync synchronizes data from remote stores into PrestaShop's managed cloud infrastructure and enables data processing:

![CloudSync Data Flow](/assets/images/cloudsync/cloudsync-data-flow.jpg)

### Components

PrestaShop CloudSync is composed of several components that help you develop powerful modules or services, based on reliable PrestaShop data, in order to offer the best experience to merchants. Below are the main pillars of PrestaShop CloudSync:

#### :hammer_and_wrench: CloudSync SDK

CloudSync SDK is a toolkit containing several components enabling you to easily and quickly integrate CloudSync into your modules or services.

##### Merchant Sharing Consent UI

A UI component library, allowing merchants to consent to the data sharing between their store and your modules or services. You need to integrate this component into the activation funnel of your modules. Merchants are thus aware of the type of data being shared and can give their consent:

![Merchant Sharing Consent UI](/assets/images/cloudsync/cloudsync-consent-ui.png)

##### PrestaShop Tech Vendor Boilerplate

The [PrestaShop Tech Vendor Boilerplate](https://github.com/PrestaShopCorp/ps_tech_vendor_boilerplate) is a sample module helping you integrate PrestaShop EventBus and Merchant Sharing Consent UI into your modules or services.

#### :arrows_counterclockwise: PrestaShop EventBus Module

Acting as a CloudSync agent, PrestaShop EventBus is a companion module that enables the synchronization of store data to CloudSync services. Following the download and installation of a CloudSync-based module, PrestaShop EventBus is automatically installed on the merchant's store as a dependency. It enables the synchronization of technical and non-personal data only:

![PrestaShop EventBus Module](/assets/images/cloudsync/cloudsync-eventbus-module.png)

:::tip Note
This data synchronization is necessary for your modules to operate. Uninstalling the PrestaShop EventBus module may cause bugs or the complete shutdown of your modules or services
:::

#### :electric_plug: PrestaShop CloudSync APIs

PrestaShop CloudSync includes several API endpoints which expose all the data collected on PrestaShop merchants' stores and synchronized into the cloud.

##### Expose Raw API

Enables you to request all the raw data captured by CloudSync. This API exposes 20 tables (carriers, carts, categories, modules, orders, products, stores, themes, etc.) that contains more than 200 properties.

##### Reporting API

Enables you to query the status of the latest synchronizations and errors from stores using your modules and services.

#### :chart_with_upwards_trend: CloudSync Tech Console

The CloudSync Tech Console is a web interface that allows you to monitor the usage and performance of your CloudSync integrated modules:

![CloudSync Tech Console](/assets/images/cloudsync/cloudsync-tech-console.png)

Number of merchant users, number of modules installed, usage by country, number of active or inactive modules… Thanks to the console, you can access several KPIs for monitoring the adoption and usage of your modules by merchants. 

The Tech Console also streamlines the support and debugging of modules. Through this interface, you can perform an analysis of the stores that use your modules to check the correct configuration and execution of CloudSync.
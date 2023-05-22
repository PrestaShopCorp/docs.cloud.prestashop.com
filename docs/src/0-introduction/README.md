---
title: introduction
---

# :rocket: Introduction

![Contact Built For](/assets/images/contact/contact-built-for.png){#.book-meeting#}

## Who is this documentation for?

This documentation is intended for partners, sellers, developers, and agencies who **create and distribute modules and/or themes** that will be added to the [PrestaShop Marketplace](https://addons.prestashop.com/en/).

## Why read this?

PrestaShop is an extremely customizable e-commerce platform that was designed so that third-party modules could easily build upon its foundations.

The goal of this documentation is to help you **take advantage of the PrestaShop Integration Framework to connect your modules to the PrestaShop ecosystem** so you can optimize development and usability.

## What is the PrestaShop Integration Framework?

Previously known as "SaaS App", the PrestaShop Integration Framework includes several different services that you can select according to your needs. It improves merchant experience and streamlines the development of commonly used features such as billing and data synchronization.

## Why Use the PrestaShop Integration Framework?

### :eight_pointed_black_star: General Benefits

**Faster time to market**: The PrestaShop Integration Framework allows you to upgrade PrestaShop module less frequently, so you can deploy your services as soon as they are ready, and make them available to all merchants right away.

**Open tech stack**: You can develop your services in any language (PHP, Node.js, Go, Rust, Java, ...) or framework available. APIs allow your developers to agnostically integrate a PrestaShop environment.

**Breaking changes loose coupling**: When PrestaShop releases a major version, only your module has to be updated. You can keep your backend services as they are.

**High computing load**: You can manipulate data without compromising the merchants' ability to serve their customers. Heavy data processing can be performed on your own services.

### :passport_control: PrestaShop Account

PrestaShop Account establishes a **link between the module and the PrestaShop accounts**. It allows you and PrestaShop to identify the merchant in the PrestaShop system.

#### Why Use It?
- Required to use other services of the PrestaShop Integration Framework
- Saves time for merchants through automatic login
- Improves your visibility on merchant data: insights on conversions

### :credit_card: PrestaShop Billing

PrestaShop Billing allows the PrestaShop billing system to deal with the **management and invoicing of merchant subscriptions**.

#### Why Use It?
- Optimized payment experience for merchants
- New payment model for you with automatic monthly payments
- Improvement of GDPR compliance, as merchants are requested to consent to the processing of their data when proceeding to payment
- Better tracking of the store activations for your module
- Possibility to offer different pricing plans

### :cloud: PrestaShop CloudSync

At the core of PrestaShop, CloudSync allows you to **duplicate and synchronize merchant store data on PrestaShop cloud servers** (carriers, carts, orders, products and more) so you can access and integrate comprehensive data into your modules or services to offer merchants the most optimized experience.

#### Why Use It?
- Capture comprehensive merchant store data into the cloud
- Access reliable, structured, and fresh data in just a few clicks
- Easily integrate PrestaShop data in your modules or services: CloudSync handles the support of all versions of PrestaShop, and standardize data models across PrestaShop versions
- Get a better understanding of your modules or services usage through data monitoring

## Prerequisites

### Compatibility chart

The following configuration is required to use the PrestaShop Integration Framework:

| PrestaShop platform | PHP          | PrestaShop Account    | PrestaShop Billing (components)    | PrestaShop Billing (PHP helper)    | PrestaShop CloudSync (EventBus)    |
| ------------------- | ------------ | --------------------- | ---------------------------------- | ---------------------------------- | ---------------------------------- |
| 8.0                 | 7.2 – 8.1    | 6.x                   | Yes                                | 2.x                                | 1.8.0                              |
| 1.7.8               | 7.1 – 7.4    | 5.x                   | Yes                                | 1.x                                | 1.6.10 – 1.7.x                     |
| 1.7.7               | 7.1 – 7.3    | 5.x                   | Yes                                | 1.x                                | 1.6.10 – 1.7.x                     |
| 1.7.5 – 1.7.6       | 5.6 – 7.2    | 5.x                   | Yes                                | 1.x                                | 1.6.10 – 1.7.x                     |
| 1.7.4               | 5.6 – 7.1    | 5.x                   | Yes                                | 1.x                                | 1.6.10 – 1.7.x                     |
| 1.7.0 – 1.7.3       | 5.6 – 7.1    | 5.x                   | Yes                                | 1.x                                | 1.6.10 – 1.7.x                     |
| 1.6.1.x             | 5.6 – 7.1    | 5.x                   | Yes                                | 1.x                                | 1.6.4 – 1.6.9                      |

### Supported languages

To perform the integration of your module with the PrestaShop ecosystem, you need to use the following languages:

- [PHP](https://www.php.net/) for the backend
- [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) for the frontend

:::tip Note
For the **frontend**, you can also use [Vue.js 3](https://vuejs.org/) or [React](https://fr.reactjs.org/), but PrestaShop does not provide support for integrations implemented with these languages.
:::

:::tip Note
For **your own services**, that you will connect to the PrestaShop ecosystem, you can use the language of your choice. See [PrestaShop Integration Framework Architecture](../1-how-it-works/README.md#prestashop-integration-framework-architecture) for more information.
:::

## Getting help

If you need any extra help, please get in touch with your **Solution Engineer** at PrestaShop.

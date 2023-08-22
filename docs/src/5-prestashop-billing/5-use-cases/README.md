---
title: Use Cases
---

[[toc]]

# Concepts

Prestashop Billing currently supports four types of pricing models:

- Flat fee
- Stairstep
- Usage-based
- Charge at term

Each pricing model has its advantages and suitability depending on the nature of the SaaS product, target audience, and the specific needs of the customers

### Flat Fee

In the flat fee pricing model, customers are charged a fixed and consistent amount for using the SaaS product or service. Regardless of the usage volume or frequency, the cost remains the same. This model offers simplicity and predictability, making it easy for customers to understand and budget their expenses. It is particularly suitable for users who require unlimited access to the SaaS product without worrying about usage-based charges.

**_Example:_** A cloud storage SaaS offers a flat fee pricing model of 10€ per month for 100GB of storage space. Regardless of whether the customer uses 50GB, 100GB, or even less than 100GB, the monthly cost remains fixed at 10€.

### Stairstep

The stairstep pricing model involves tiered pricing based on predefined usage thresholds. As customers' usage surpasses specific milestones, their pricing "steps up" to the next tier, resulting in adjusted pricing. Each tier typically offers additional benefits or features, providing incentives for customers to use more of the SaaS product and possibly unlocking volume discounts. The stairstep model aims to encourage customer loyalty and gradual growth in usage.

**_Example:_**
An email marketing SaaS offers a stairstep pricing model with three tiers. The first tier allows up to 1,000 subscribers and costs 15€ per month. As the customer's subscriber count grows, they move to the second tier, which supports up to 5,000 subscribers and costs 30€ per month. If their subscriber count exceeds 5,000, they enter the third tier, accommodating up to 10,000 subscribers and costing 50€ per month.

### Usage-Based

In the usage-based pricing model, customers are charged based on their actual usage of the SaaS product or service. The pricing is directly linked to specific usage metrics, such as the number of active users, data storage utilized, API calls made, or other measurable parameters. Customers pay only for the resources they consume, making it a flexible option for businesses with varying usage needs. This model is ideal for SaaS products with fluctuating or unpredictable usage patterns.

**_Example:_**
A video conferencing SaaS applies usage-based pricing for its business customers. They charge $0.05 per minute of video conferencing usage. If a customer conducts a 30-minute video conference, the cost would be 1.50€ (30 minutes \* 0.05€ per minute) invoiced at the end of the billing period.

:::tip
For more details on Usage-Based API is [available here](https://prestashop-billing.stoplight.io/docs/api-gateway/896ba54736b77-add-an-usage-to-a-subscription-item) (opens new window).
:::

### Charge at Term

The charge at term pricing model involves billing customers at fixed intervals, such as monthly or annually, regardless of their actual usage during that period. The pricing is usually based on a predefined set of features or service tiers offered by the SaaS provider. This model is suitable for SaaS that have many different prices such as parcel delivery services (which have variable prices depending on the weight, size and shipping address of the parcels)

**_Example:_**
A shipping company applies charge at term pricing for its business customer. They got a lot of different pricing regarding the size or the weight of each package. If a customer send 4 packages during the month with different pricing (2 at 12€, 1 at 5$ and 1 at 35€), the cost would be 64€ invoiced at the end of the billing period.

:::tip
For more details on Charge at Term API is [available here](https://prestashop-billing.stoplight.io/docs/api-gateway/0dec9ae31dd59-add-a-charge-at-term) (opens new window).
:::

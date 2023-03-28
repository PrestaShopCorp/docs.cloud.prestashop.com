---
title: PrestaShop Integration Framework APIs
---

# :electric_plug: PrestaShop Integration Framework APIs

## Overview

Through these various API routes, you can access and integrate PrestaShop store data into your modules and third party services. Here are some key considerations before using the PrestaShop Integration Framework APIs:

- The PrestaShop Integration Framework APIs support REST.
- They are versioned and get regular updates. The documentation is always based on the latest production version.
- You must be registered in our system to receive a valid token in order to query these routes.
- The APIs are fully documented in an OpenAPI 3.0 compliant documentation.

:::warning Contact Us
Our team is here to help you get started with the implementation of PrestaShop CloudSync APIs. Please [click here](https://meetings.hubspot.com/esteban-martin3/prestashop-new-framework-integration-meeting) to set up a meeting with us before proceeding with the integration of your module.
:::

## Getting an Access Token

To query the PrestaShop Integration Framework APIs, you first need to receive a JWT from the Authorization Server. This JWT is issued following the [OAuth2 Standard Protocol](https://oauth.net/2/).

1. Get in touch with PrestaShop Solution Engineers (partners-soleng@prestashop.com) to get your client credentials.

2. Call the **Account Authorization Server** to get your JWT.

    **Authorization Server URL (production) :** [https://oauth.prestashop.com/](https://oauth.prestashop.com/) 

    You can use the library you want for your favorite language. Here is a list of available code libraries at this [link](https://oauth.net/code/). If you want to make this with a curl, below is an example of a request to the Authorization Server:

    ```php
    curl --request POST \
      --url https://oauth.prestashop.com/oauth2/token \
      --header 'Authorization: Basic cml2ZXJiYW5rLXRlc3QtbTJtOndZNnhtdGN3TW54UjNYWFNlcnJSTE5LdTI=' \
      --header 'Content-Type: application/x-www-form-urlencoded' \
      --data client_id=softsprint-s2s \
      --data grant_type=client_credentials \
      --data 'audience=https://api.cloudsync.prestashop.com tech-vendor/softsprint' \ 
    ```
The requested audience and scopes may differ depending on the resources you want to request.

## PrestaShop Billing API

### Why Use It?

The PrestaShop Billing API provides a unique entry point to all the different Billing services. It is still under development. :construction:

### Reference documentation

The documentation for the Billing API is [available here](https://prestashop-billing.stoplight.io/docs/api-gateway/4edcc51b01cc4-api-gateway-billing).

## PrestaShop CloudSync APIs

### Why Use It?

Below is a non-exhaustive list of the possibilities offered by powering your modules and services with the PrestaShop CloudSync APIs:

- Read PrestaShop store information, including products, categories, carts, orders, carriers, prices, currencies, themes, and more.
- Extend PrestaShop functionality with modules and services based on these data.
- Add new features to PrestaShop back and front office.
- Connect PrestaShop with third-party platforms through these APIs.
- Automate your workflows thanks to CloudSync APIs.

### Reference documentation

The general documentation for CloudSync APIs is [available here](https://docs.cloudsync.prestashop.com/). 

#### ![Expose Raw API](/assets/images/cloudsync/cloudsync-expose-raw-api.png)&ensp;Expose Raw API Documentation

This API enables you to request all the raw data captured by CloudSync. It exposes 30 tables that contain more than 300 properties.

[Expose Raw API Reference Guide](https://docs.cloudsync.prestashop.com/api-doc/expose-raw-api#/)

#### ![Reporting API](/assets/images/cloudsync/cloudsync-reporting-api.png)&ensp;Reporting API Documentation

This API enables you to query the status of the latest synchronizations and errors from stores using your modules and services based on CloudSync.

[Reporting API Reference Guide](https://docs.cloudsync.prestashop.com/api-doc/reporting-api#/)

### Tools
PrestaShop also provides you with a range of tools and libraries to speed up the integration of CloudSync APIs into your projects:

#### ![Postman Collection](/assets/images/cloudsync/cloudsync-postman-collection.png)&ensp;Expose Raw API Postman Collection

Postman collection dedicated to the Expose Raw API. Include pre-built and saved requests to ease the usage.

<!--- Link to add when available --->

#### ![Postman Collection](/assets/images/cloudsync/cloudsync-postman-collection.png)&ensp;Reporting API Postman Collection

Postman collection dedicated to the Reporting API. Include pre-built and saved requests to ease the usage..

<!--- Link to add when available --->

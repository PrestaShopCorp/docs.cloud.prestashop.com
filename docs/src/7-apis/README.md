---
title: PrestaShop Integration Framework APIs
---

# :electric_plug: PrestaShop Integration Framework APIs

<!--- Billing API Section to add when available --->

## PrestaShop CloudSync APIs

Through these various CloudSync API routes, you can easily access and integrate PrestaShop store data into your modules and third party services. Here are some key considerations before using CloudSync APIs:

- CloudSync APIs support REST.
- CloudSync APIs are versioned and get regular updates. The documentation is always based on the latest production version.
- You must be registered in our system to receive a valid token in order to query these routes.
- The CloudSync APIs are fully documented in an OpenAPI 3.0 compliant doc.


### Building with the CloudSync APIs

Below is a non-exhaustive list of the possibilities offered by powering your modules and services with PrestaShop CloudSync:

- Read PrestaShop store information, including products, categories, carts, orders, carriers, prices, currencies, themes, and more.
- Extend PrestaShop functionality with modules and services based on these data.
- Add new features to PrestaShop back and front office.
- Connect PrestaShop with third-party platforms through these APIs.
- Automate your workflows thanks to CloudSync APIs.

### Reference documentation

The general documentation for CloudSync APIs is [available here](https://docs.cloudsync.prestashop.com/). 

#### ![Expose Raw API](/assets/images/cloudsync/cloudsync-expose-raw-api.png)&ensp;Expose Raw API Documentation

This API enables you to request all the raw data captured by CloudSync. It exposes 20 tables that contain more than 200 properties.

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
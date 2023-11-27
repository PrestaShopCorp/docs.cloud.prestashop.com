---
title: Billing API
---

# Billing API

The documentation for the Billing API is [available here](https://prestashop-billing.stoplight.io/docs/api-gateway/4edcc51b01cc4-api-gateway-billing).

## Activating the Sandbox mode for any API request.

You may activate the Sandbox mode by providing either a `sandbox` **header**, or specifying `sandbox` as a **query param** in the url.

For example as a query parameter: `https://api.billing.prestashop.com/v1/products/builtfor_example/components?sandbox=true`.
Or as a header:

```bash
curl --request GET \
    --url https://api.billing.prestashop.com/v1/products/builtfor_example/components \
    --header 'Accept: application/json' \
    --header 'sandbox: true'
```

## Getting an Access Token

To query the PrestaShop Integration Framework APIs, you first need to receive a JWT from the Authorization Server. This JWT is issued following the [OAuth2 Standard Protocol](https://oauth.net/2/).

1.  Get in touch with PrestaShop Solution Engineers (partners-soleng@prestashop.com) to get your client credentials.

2.  Call the **Account Authorization Server** to get your JWT.

**Authorization Server URL (production) :** [https://oauth.prestashop.com/](https://oauth.prestashop.com/)

You can use the library you want for your favorite language. Here is a list of available code libraries at this [link](https://oauth.net/code/). If you want to make this with a curl, below is an example of a request to the Authorization Server:

```bash
curl --location --request POST 'https://oauth.prestashop.com/oauth2/token' \
--header 'Authorization: Basic dGVzdGluZ19jbGllbnRfY3JlZGVudGlhbHM6c2ZDMHRwZnhwTThwRW5lUXg0dkYzWTdwdk0=' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'client_id=PROVIDED_BY_PRESTASHOP' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'audience=distribution.prestashop.net' \
--data-urlencode 'scope=openid'
```

:::warning Important
Make sure you modify the `client_id=PROVIDED_BY_PRESTASHOP` portion with the client_id that has been shared with you.

The same also applies for the `Authorization` header, which should be comprised of `<client_id>:<secret_id>` (which have been shared with you) encoded in base64.

The `scope` portion should be comprised of scopes you need as per our [API reference](https://prestashop-billing.stoplight.io/docs/api-gateway/4edcc51b01cc4-api-gateway-billing), separated by a space. For example: `scope=subscription.write.quantity subscription.write`. Please remember that those scopes must be enabled for your client. If in doubt, do not hesitate to contact PrestaShop Solution Engineers (partners-soleng@prestashop.com).
:::

Then this token should be added to any request that specifies `OpenID Connect` as its security method, as a JWT bearer token to the `Authorization` header (for example: `--header 'Authorization: Bearer YOUR_ACCESS_TOKEN` with cURL)

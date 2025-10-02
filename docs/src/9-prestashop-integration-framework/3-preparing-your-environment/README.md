---
title: Preparing Your Environment for the PrestaShop Integration Framework
---

# :roller_coaster: Preparing Your Environment for the PrestaShop Integration Framework

To use the PrestaShop Integration Framework, you need to **have a PrestaShop store instance running and available online**.

You can either choose to install PrestaShop manually and configure it yourself, or use Docker Compose Kickstarter, a repository allowing you to install a Docker image of a preconfigured PrestaShop environment, already available online.

## Installing PrestaShop Manually

### Follow the Documentation

You can install PrestaShop manually by following the [Module Developer Guide](https://devdocs.prestashop-project.org/8/basics/installation/).

### Create an SSH Tunnel

To connect your PrestaShop store to PrestaShop Account, you will need to **create an SSH tunnel** that will allow your PrestaShop store to communicate with the Internet. To do so, you have two possibilities:

- The most convenient solution is to use [ngrok](https://ngrok.com/docs), but the free version will provide you with a different URL everytime you restart your machine, which requires reconfiguring the database each time. This solution thus requires either using the payable solution or performing advanced configuration on the database.

- Another solution is to use [localtunnel](https://github.com/localtunnel/localtunnel).

## Installing a Preconfigured PrestaShop

If you're not familiar with PrestaShop development, or for testing purposes, you can follow the procedure provided in the [Docker Compose Kickstarter](https://github.com/PrestaShopCorp/docker-compose-kickstarter) repository. This project allows you to download and launch a Docker image of a preconfigured PrestaShop store instance and relies on [ngrok](https://ngrok.com/docs) to open a network edge endpoint.
# Full-stack Data-science Project: Real estates

The goal of this project is to build an accurate model based on real-world data for predicting real-estate prices.
This project is split into four steps:
* Web scraping
* Data analysis
* Data modeling
* Deployment

A docker image is provided with each step.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for  testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [Docker](https://www.docker.com/) - For creating isolated development and production environments.

### Installing

It's recommended that you have docker installed on your machine. In case you don't, please follow the instruction [here](https://docs.docker.com/install/).
It's also advised to install [Docker-Compose](https://docs.docker.com/compose/install/).

Once you installed and configured docker, clone this repo and let's dive into it.

## Step 1: Web scraping

All the data that we will be scraping is from https://www.seloger.com

First change into step 1:
```
cd p2m/Step\ 1
```
You'll find two folders, one for scrapping offers for rental, the other for scrapping offers for sale.
Let's start with the rental offers
```
cd rental
```
To launch the scraper, simply run:
```
docker-compose up
```
The scrapping process is hard and time-consumming so be prepared.

Once you think you've collected enough data, open another terminall and run:
```
docker-compose down
```
You'll notice that a new folder has been created, this is where all the data is stored.
To view or query the data, type:
```
docker run -it --rm -v $PWD/db:/data mongo bash
mongo
use p2m
db.rental.find()
```
P.S: The actual scraped data used in production is stored in a remote database and it isn't provided in this repo.

This is it for rental offers, now let's move to the other folder:
```
cd ../sale
```
**Work in progress**

## Step 2: Data Analysis

**Work in progress**

## Step 3: Data Modeling

**Work in progress**

## Step 4: Deployment

**Work in progress**

## Authors

* **Ghassen Ghabarou**
* **Ghassen Chaabouni**
* **Mahdi ben Ayed**

## Contributing

If you want to contribute to this project, fork this repo and after you finish development, make a pull request, it will be reviewed for approval.

P.S: The master branch is protected, you'll need to push your code to another branch.

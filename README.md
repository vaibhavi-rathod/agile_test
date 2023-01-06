## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Steps to run application
At the time of running application. it will scrap website data from AWS source URL and store details into mongoDB database.

To get list of all Products ====> http://localhost:3000/products

To delete Product By id ====> http://localhost:3000/products/delete/id
(id of product which you want to delete)

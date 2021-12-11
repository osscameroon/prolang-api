# Programming language API

Get information about programming languages

[![Website](https://github.com/osscameroon/prolang-api/actions/workflows/ci-web.yml/badge.svg)](https://github.com/osscameroon/prolang-api/actions/workflows/ci-web.yml)
[![API](https://github.com/osscameroon/prolang-api/actions/workflows/ci-api.yml/badge.svg)](https://github.com/osscameroon/prolang-api/actions/workflows/ci-api.yml)
![Follow](https://img.shields.io/twitter/follow/osscameroon?style=social)

![Website](https://prolanghistory.com/assets/img/og.png)

# Features
- Retrieve all programming languages
- Retrieve programming languages by a group of years (the 1940s, 1950s, 1990s, 2000s, etc.)
- Retrieve successors and predecessors of a language
- Retrieve programming languages authors

## Prerequisites
- Node.js 12+
- Yarn or NPM
- MongoDB 4+
- Docker and Docker Compose

## Installation
Clone the project and install the dependencies for each project
```shell
git clone https://github.com/osscameroon/prolang-api.git
cd prolang-api/apidoc && yarn install
cd ../backend && yarn install
cd ../frontend && yarn install
```
If you want to launch the application locally with configuring each project, run the command below
at the project root directory
```shell
docker-compose up -d
```
Wait for the application to be ready then, navigate to `http://localhost:5701` and explore the app.

## Backend
The backend interacts with a Mongo database so, make sure you set up one before continuing.
Check out [this tutorial](https://blog.tericcabrel.com/enable-authentication-and-authorization-on-mongodb/) to see how to set up.

Create the environment file from the template and update the database URL to your
```shell
cp .env.tempalte .env
nano .env # update the properties, save and exit
```
Generate GraphQL types and start the application
```shell
yarn generate:types
yarn start
```
- Navigate to `http://localhost:5700` for the REST API
- Navigate to `http://localhost:5700/graphql` for the GraphQL Playground

## Apidoc
No additional action is required here to start working. 
Check out the Readme inside the project for more details

## Frontend
Make sure the Backend is up and running before launching this project.

Create the environment file from the template and start the project
```shell
cp .env.template .env.development.local
yarn dev
```
Navigate to `http://localhost:5701` to view the website

## Testing
Every project has tests to validate the integrity of the feature before shipping in production.

### Apidoc
The test verifies that the API definition is valid according to the OpenAPI specification.
Run the command to validate:
```shell
yarn lint
```

### Backend
The purpose is to make sure critical features of the application still work as expected by running
unit and integration tests.

Testcontainers is used to create a database for testing purpose.
So, you don't have to worry about your local DB is being polluted.
```shell
yarn test
```

### Frontend
As same as for the Backend, unit and end-to-end tests are written on the critical component.
Cypress is used to testing the navigation flow of the application.
Jest is used to test component behavior

Run end-to-end tests with Cypress:
```shell
yarn test:it
# to launch it in headless browser mode
yarn test:it:ci 
```

Run component tests with Jest
```shell
yarn test
```

## Deployment
We use GitHub Action for Continuous Integration and Continuous Delivery.

- The frontend deployment is handled by Vercel Bot that gives you a preview of the website
  when you create a pull request. It is deployed in production once merged on the main branch


- The backend deployment is handled also automated through a bash script that connects to the production server, pulls the new docker image, and runs it.

## How to contribute

- Create an issue where you explain clearly the problem you want to solve
- Make a Pull Request
- If it's relevant, we're going to merge it.
  Yeah, it's simple as this!


## License

- [LICENSE: MIT](/LICENSE)

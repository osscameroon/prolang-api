# Programming language API

Get information about programming languages

## Prerequisites
- Node.js 12+
- Yarn or NPM

## Installation
- Install dependencies
```shell
yarn install
```
- Create configuration file from the template
```shell
cp .env.template .env

# Edit configuration to match your local environment and save
nano .env
```
Generate types for graphql schemas and resolvers
```shell
yarn generate:types
```

- Start Application
```bash
yarn start
```
The application will be launched by [Nodemon](https://nodemon.com)

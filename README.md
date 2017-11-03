[![CircleCI](https://circleci.com/gh/yevgeniyvaleyev/ko-reac-stocker.svg?style=svg)](https://circleci.com/gh/yevgeniyvaleyev/ko-reac-stocker)

## About

This application consists of server and client parts.

### Server
Server exposes API for managing stocks:
- GET `/api/stocks` - get a list of stocks
- GET `/api/stocks/:id` - get one stock from the list
- PUT `/api/stocks/:id` - update the price of a single stock
- POST `/api/stocks` - create a stock
Stocks API is covered with unit tests.

### Client
Client displays a list of stocks with `edit` control, also it has `add stock` control.
Client uses Material design for interface. 

## Installation

- `8.1.2` version of Node.js is used
- run `npm i` to install needed packages

## Run

- use `npm start` to build and run the app in development mode, 
use `http://localhost:3000/` to open app in a browser.
- use `npm run start-prod` to build and run the app in production mode, 
same URL as development mode.
- use `npm run build` if you just need to bundle client and prepare it for production.

## Code quality

- use `npm run lint` to start code checker
- use `npm test` to run client and server unit tests.
- use `npm run test-server` to run unit tests for server API
- use `npm run test-client` to run unit tests for client, which are done for few components 
for demonstration purpose.
- use `npm run start-err` to run server in error demonstration mode, when it throws
 stocks fetch error 70% percent of time (It's just for demo). In this mode you could see how
 client handles such errors for a user.

## Technologies

### Client

Client is a single page application which is built with `React`, `Redux`,
`material ui` for visual interface and other.
Client is bundled with `Webpack` and `Babel`. Application compiled in memory during development
mode and in auto generated folder `dist` (in root) for production mode.
Source maps are available in development mode.
Client code is minified for production. 
 
### Server

Server is built using `koa` framework and other side libraries.
Server uses Webpack development middleware and hot reload middleware for development.

### Testing

`Mocha` and `Chai` (and other) are used for unit testing and plus `Enzyme` for client.

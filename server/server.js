const Koa = require('koa');
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const convert = require('koa-convert');
const send = require('koa-send');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');

const Router = require('koa-router');
const argv = require('yargs').argv;

const isProduction = !!argv.production || process.env.PRODUCTION;

console.log(`
=============
  ${isProduction}
=============
`);
const stocksApi = require('./routes/stocks-api');
const getConfig = require('../config/webpack.config.js');
const app = new Koa();

const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

const serve = require('koa-static');
app.use(serve('./public'));
app.use(serve('./server'));

middlewares.forEach((middleware) => {
  // eslint-disable-next-line global-require
  app.use(require(`./middlewares/${middleware}`));
});

const router = new Router();

app.use(router.routes());

router.get('/api/stocks', stocksApi.getAll);
router.get('/api/stocks/:id', stocksApi.get);
router.put('/api/stocks', stocksApi.put);
router.post('/api/stocks/:id', stocksApi.update);

if (!isProduction) {
  const config = getConfig(isProduction);
  const compiler = webpack(config);
  const isClientRoutePath = /^\/(.*)-stock(?:\/|$)/;

  app.use(devMiddleware(compiler));
  app.use(convert(hotMiddleware(compiler)));

  router.get(isClientRoutePath, async (ctx) => {
    await send(ctx, './client/index.html');
  });
}

// if (isProduction) {
//   const isNotAPIRoutePath = /^(?!.*\/api).*$/;
//   router.get(isNotAPIRoutePath, async (ctx) => {
//     await send(ctx, './public/index.html');
//   });
// }

module.exports = app;

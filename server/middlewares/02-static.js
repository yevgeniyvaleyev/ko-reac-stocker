
const serve = require('koa-static');
module.exports = serve(`${process.env.PWD}/public`);


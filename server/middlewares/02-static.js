const path = require('path');
const serve = require('koa-static');
module.exports = serve(path.resolve(__dirname, '../public'));


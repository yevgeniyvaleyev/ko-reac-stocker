const send = require('koa-send');
const path = require('path');

/**
 * Support for clint routes when user reloads a page being
 * on a path which is recognized by client router
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */
module.exports = async (ctx, next) => {
  await next();
  const status = ctx.status || 404;
  if (status === 404) {
    await send(ctx, 'index.html', {
      root: path.join(__dirname, '../../public'),
    });
  }
};


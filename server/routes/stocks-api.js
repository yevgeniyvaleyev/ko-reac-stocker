const db = require('../libs/db-client');
const argv = require('yargs').argv;

const isErrorDemonstrationMode = !!argv.error_demo_mode;

function generateCustomError(message, status) {
  const error = new Error(JSON.stringify({ error: message }));
  error.status = status;
  throw error;
}

module.exports.getAll = async (ctx) => {
  // just for demonstration
  if (isErrorDemonstrationMode && Math.random() < 0.7) {
    generateCustomError('Custom server error for demonstration', 500);
  }
  ctx.body = db.getAllStocks();
};

module.exports.get = async (ctx) => {
  const stock = db.findStock(ctx.params.id);

  if (!stock) {
    generateCustomError('Stock does not exist', 404);
  }

  ctx.body = stock;
};

module.exports.put = async (ctx) => {
  const {
    currentPrice,
    name,
  } = ctx.request.body;

  if (!name || isNaN(currentPrice)) {
    generateCustomError('Invalid stock data', 400);
  }

  const stockData = {
    currentPrice,
    name,
  };
  ctx.body = db.addStock(stockData);
};

module.exports.update = async (ctx) => {
  const stock = db.findStock(ctx.params.id);

  const {
    currentPrice,
    name,
  } = ctx.request.body;

  if (!stock) {
    generateCustomError('Stock does not exist', 404);
  }

  if (!name || isNaN(currentPrice)) {
    generateCustomError('Invalid stock data', 400);
  }

  stock.currentPrice = currentPrice;
  stock.name = name;
  ctx.body = stock;
};

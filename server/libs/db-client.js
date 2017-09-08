const generateId = require('./generate-id');
const db = require('./fake-db');

function hasRequiredFields(data) {
  const requiredFields = ['currentPrice', 'name'];

  return requiredFields.every((field) => data[field] !== undefined);
}

function generateStock(data) {
  if (!hasRequiredFields(data)) {
    throw new Error('Data for new stock is invalid');
  }
  const stock = {
    name: data.name,
    currentPrice: data.currentPrice,
    id: generateId(),
    lastUpdate: Date.now(),
  };
  return stock;
}

function getAllStocks() {
  return db.stocks;
}

function findStock(id) {
  const parsedId = parseInt(id, 10);
  return db.stocks.find((stock) => stock.id === parsedId);
}

function addStock(data) {
  const stock = generateStock(data);
  db.stocks.push(stock);
  return stock;
}

module.exports = {
  getAllStocks,
  findStock,
  addStock,
};


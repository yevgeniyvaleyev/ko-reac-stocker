const generateId = require('./generate-id');

module.exports = {
  stocks: [
    {
      id: generateId(),
      name: 'Stock 1',
      currentPrice: 123,
      lastUpdate: Date.now(),
    },
    {
      id: generateId(),
      name: 'Great Stock',
      currentPrice: 150,
      lastUpdate: Date.now(),
    },
  ],
};

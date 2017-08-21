const request = require('request-promise').defaults({
  encoding: null,
  simple: false,
  resolveWithFullResponse: true,
});
const { should, expect } = require('chai');
should();

const server = require('../server');


describe('server tests', () => {
  let serverInstance;

  function getURL(path) {
    return `http://localhost:3000${path}`;
  }

  before(done => {
    serverInstance = server.listen(3000, done);
  });

  after(done => {
    serverInstance.close(done);
  });

  describe('GET one stock - /api/stocks/:id', async () => {
    it('gets the stock by id', async () => {
      const response = await request.get(getURL('/api/stocks/1'));
      const stock = JSON.parse(response.body);

      stock.id.should.eql(1);
      response.statusCode.should.eql(200);
      response.headers['content-type'].should.match(/application\/json/);
    });

    it('returns 404 if stock does not exist', async () => {
      const response = await request.get(getURL('/api/stocks/33'));
      response.statusCode.should.eql(404);
    });

    it('returns 404 if invalid id', async () => {
      const response = await request.get(getURL('/api/stocks/foo'));
      response.statusCode.should.eql(404);
    });
  });

  describe('GET all stocks - /api/stocks', async () => {
    it('gets the stock by id', async () => {
      const response = await request.get(getURL('/api/stocks'));
      const stocks = JSON.parse(response.body);

      expect(typeof(stocks)).to.equal('object');
      stocks[0].id.should.eql(0);
      response.statusCode.should.eql(200);
      response.headers['content-type'].should.match(/application\/json/);
    });
  });

  describe('PUT new stock - /api/stocks', async () => {
    it('put the stock', async () => {
      const data = {
        name: 'test',
        currentPrice: 123,
      };
      const response = await request({
        method: 'put',
        uri: getURL('/api/stocks'),
        json: true,
        body: data,
      });
      const stock = response.body;

      stock.name.should.eql(data.name);
      stock.currentPrice.should.eql(data.currentPrice);
      response.statusCode.should.eql(200);
      response.headers['content-type'].should.match(/application\/json/);
    });

    it('fail to put invalid stock', async () => {
      const data = {
        name: 'test',
      };
      const response = await request({
        method: 'put',
        uri: getURL('/api/stocks'),
        json: true,
        body: data,
      });

      response.statusCode.should.eql(400);
    });
  });

  describe('POST updated stock - /api/stocks', async () => {
    let targetStock;

    beforeEach(async () => {
      const targetStockResponse = await request.get(getURL('/api/stocks/1'));
      targetStock = JSON.parse(targetStockResponse.body);
    });

    it('post the stock', async () => {
      const updatedStock = {
        ...targetStock,
        name: 'my-test',
      };
      const response = await request({
        method: 'post',
        uri: getURL(`/api/stocks/${updatedStock.id}`),
        json: true,
        body: updatedStock,
      });
      const stock = response.body;

      stock.name.should.not.eql(targetStock.name);
      stock.name.should.eql(updatedStock.name);
      stock.id.should.eql(targetStock.id);
      response.statusCode.should.eql(200);
      response.headers['content-type'].should.match(/application\/json/);
    });

    it('fail to post invalid stock', async () => {
      const invalidStock = {};
      const response = await request({
        method: 'post',
        uri: getURL(`/api/stocks/${targetStock.id}`),
        json: true,
        body: invalidStock,
      });

      response.statusCode.should.eql(400);
    });

    it('fail to post stock by invalid id', async () => {
      const invalidId = 1234567;
      const response = await request({
        method: 'post',
        uri: getURL(`/api/stocks/${invalidId}`),
        json: true,
        body: {},
      });

      response.statusCode.should.eql(404);
    });
  });
});

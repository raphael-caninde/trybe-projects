const { expect } = require('chai');
const sinon = require('sinon');

salesController = require('../../../controllers/salesController');
salesService = require('../../../services/salesService');

const response = {};
const request = {};

before(() => {
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns(response);
})

describe('Testa a camada controllers', () => {
  const allSales =  [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ]

  describe('Verifica se todos os produtos estão sento retornados', () => {
    before(async () => {
      sinon.stub(salesService, 'getSalesAll').resolves(allSales);
    })

    after(async () => {
      salesService.getSalesAll.restore();
    })

    it('Vendas retornadas', async () => {
      await salesController.getSalesAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(allSales)).to.be.equal(true);
    })
  })
})

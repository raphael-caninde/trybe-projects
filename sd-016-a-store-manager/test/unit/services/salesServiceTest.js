const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');

describe('Testa a camada services', () => {
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

  describe('Verifica se todas as vendas são retornadas', () => {
    before(async () => {
      sinon.stub(salesModel, 'getSalesAll').resolves(allSales);
    })

    after(async () => {
      salesModel.getSalesAll.restore()
    })

    it('Retorna todas as vendas', async () => {
      const result = await salesService.getSalesAll();

      expect(result).to.be.equals(allSales);
    })
  })
})

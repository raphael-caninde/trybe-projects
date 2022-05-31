const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/mysql-connetion');

const salesModel = require('../../../models/salesModel');


describe('Testa a camada models', () => {
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

  describe('Verifica se retorna todos as vendas', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([allSales]);
    })

    after(async () => {
      connection.execute.restore();
    })

    it('Retorna todos as vendas', async () => {
      const result = await salesModel.getSalesAll();

      expect(result).to.be.equals(allSales);
    })
  })

  describe('verifica se passado um ID, uma venda é retornado', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([allSales])
    })

    after(async () => {
      connection.execute.restore();
    })

    it('Venda por Id retornado', async () => {
      const result = await salesModel.getSalesId(1)

      expect(result[0]).to.include.all.keys('date', 'productId', 'quantity');
    })
  })
})

const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../models/mysql-connetion');

const productModel = require('../../../models/productModel');

describe('Testa a camada Models', () => {
  const allProducts = [{id: 1, name: 'coxinha de frango', quantity: 10}, {id: 2, name: 'pastel de carne', quantity: 8}];
  const productId = [{id: 1, name: 'coxinha de frango', quantity: 10}];

  describe('Verifica se retorna todos os produtos', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([allProducts]);
    })

    after(async () => {
      connection.execute.restore();
    })

    it('Retorna todos os productos', async () => {
      const result = await productModel.getAll();

      expect(result).to.be.equals(allProducts);
    })
  })

  describe('verifica se passado um ID, o produto é retornado', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([productId]);
    })

    after(async () => {
      connection.execute.restore()
    })

    it('Deve retorna um produco com ID específico', async () => {
      const result = await productModel.getById(1);

      expect(result).to.have.all.keys('id', 'name', 'quantity');
    })
  })
})

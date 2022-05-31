const { expect } = require('chai');
const sinon = require('sinon');

const productService = require('../../../services/productService');
const productModel = require('../../../models/productModel');


describe('Testa a camada services', () => {
  const allProducts = [{id: 1, name: 'coxinha de frango', quantity: 10}, {id: 2, name: 'pastel de carne', quantity: 8}];
  const newProduct = {name: 'pastel de carne', quantity: 2};
  const productId = {id: 1, name: 'coxinha de frango', quantity: 10};

  describe('Verifica se todos os produtos estão sento retornados', () => {
    before(async () => {
      sinon.stub(productModel, 'getAll').resolves(allProducts);
    })

    after(async () => {
      productModel.getAll.restore();
    })

    it('Retorna todos os produtos', async () => {
      const result = await productService.getAll();
      expect(result).to.be.equals(allProducts);
    })
  })

  describe('verifica se passado um ID, o produto é retornado', () => {
    before(async () => {
      sinon.stub(productModel, 'getById').resolves(productId);
    })

    after(async () => {
      productModel.getById.restore();
    })

    it('Deve retorna um produco com ID específico', async () => {
      const result = await productService.getById(productId.id);
      expect(result).to.be.equals(productId);
    })
  })

  describe('verifica se um novo produto foi cadastrado', () => {
    before(async() =>{
      sinon.stub(productModel, 'createProduct').resolves(newProduct);
    })

    after(async () => {
      productModel.createProduct.restore();
    })

    it('O produto foi cadastrado', async () => {
      const result = await productService.createProduct(newProduct);
      expect(result).to.be.equals(newProduct);
    })
  })
})

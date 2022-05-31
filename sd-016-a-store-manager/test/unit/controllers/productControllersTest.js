const { expect } = require('chai');
const sinon = require('sinon');

productController = require('../../../controllers/productController');
productService = require('../../../services/productService');

const response = {};
const request = {};

before(() => {
  response.status = sinon.stub().returns(response);
  response.json = sinon.stub().returns(response);
})


describe('Testa a camada controllers', () =>{
  const allProducts = [{id: 1, name: 'coxinha de frango', quantity: 10}, {id: 2, name: 'pastel de carne', quantity: 8}];
  const newProduct = {name: 'pastel de carne', quantity: 2};

  describe('Verifica se todos os produtos são retornados', () => {
    before(async () => {
      sinon.stub(productService, 'getAll').resolves(allProducts);
    })

    after(async () => {
      productService.getAll.restore();
    })

    it('Produtos retornados', async () => {
      await productController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(allProducts)).to.be.equal(true);
    })
  })

  describe('verifica se passado um ID, o produto é retornado', () => {
    request.params = { id: 1 };

    before(async () => {
      sinon.stub(productService, 'getById').resolves(allProducts);
    })

    after(async () => {
      productService.getById.restore()
    })

    it('Retorna um produto', async () => {
      await productController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(allProducts)).to.be.equal(true);
    })
  })

  describe('verifica se cria um novo produto', () => {
    request.body = { name: 'enroladinho', quantity: 5 };

    before(async () => {
      sinon.stub(productService, 'createProduct').resolves(newProduct);
    })

    after(async () => {
      productService.createProduct.restore();
    })

    it('retorna um novo protudo', async () => {
      await productController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(newProduct)).to.be.equal(true);
    })
  })
});

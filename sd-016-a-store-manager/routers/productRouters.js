const express = require('express');
const productController = require('../controllers/productController');
const {
  nameValidator,
  quantityValidator,
} = require('../middlewares/productValidation');

const routes = express.Router();

routes.get('/', productController.getAll);
routes.get('/:id', productController.getById);
routes.post('/', nameValidator, quantityValidator, productController.createProduct);
routes.put('/:id', nameValidator, quantityValidator, productController.updateProduct);
routes.delete('/:id', productController.deleteProduct);

module.exports = routes;

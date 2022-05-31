const express = require('express');
const salesController = require('../controllers/salesController');
const {
  productIdValidator,
  quantityValidator,
} = require('../middlewares/salesValidation');

const routes = express.Router();

routes.get('/', salesController.getSalesAll);
routes.get('/:id', salesController.getSalesId);
routes.post('/', productIdValidator, quantityValidator, salesController.createSales);
routes.put('/:id', productIdValidator, quantityValidator, salesController.updateSales);

module.exports = routes;

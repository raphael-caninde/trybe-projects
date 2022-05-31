const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const { isValidationCategory } = require('../middlewares/isValidationCategory');
const { validationToken } = require('../middlewares/isValidationToken');

const routes = express.Router();

routes.post('/', validationToken, isValidationCategory, categoriesController.createCategory);

routes.get('/', validationToken, categoriesController.getCategories);

module.exports = routes;

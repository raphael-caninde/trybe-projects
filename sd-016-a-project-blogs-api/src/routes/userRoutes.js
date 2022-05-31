const express = require('express');
const userController = require('../controllers/userController');
const { isValidationName } = require('../middlewares/isValidationName');
const { isValidationEmail } = require('../middlewares/isValidationEmail');
const { isValidationPassword } = require('../middlewares/isValidationPassword');
const { isEmailExist } = require('../middlewares/isEmailExist');
const { validationToken } = require('../middlewares/isValidationToken');

const routes = express.Router();

routes.post('/',
isValidationName,
isValidationEmail,
isEmailExist,
isValidationPassword,
userController.createUser);

routes.get('/', validationToken, userController.getUsers);

routes.get('/:id', validationToken, userController.getUserId);

module.exports = routes;

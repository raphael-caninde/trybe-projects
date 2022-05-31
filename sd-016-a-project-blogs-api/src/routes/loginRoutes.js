const express = require('express');
const loginController = require('../controllers/loginController');
const { isValidationEmail } = require('../middlewares/isValidationEmail');
const { isValidationPassword } = require('../middlewares/isValidationPassword');

const routes = express.Router();

routes.post('/', isValidationEmail, isValidationPassword, loginController.authLogin);

module.exports = routes;

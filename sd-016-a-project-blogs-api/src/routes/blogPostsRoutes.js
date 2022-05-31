const express = require('express');
const blogPostsController = require('../controllers/blogPostsController');
const { validationToken } = require('../middlewares/isValidationToken');

const routes = express.Router();

routes.get('/', validationToken, blogPostsController.getPosts);
routes.get('/:id', validationToken, blogPostsController.getPostbyId);

module.exports = routes;

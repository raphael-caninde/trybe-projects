const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();
  return products;
};

const getById = async (id) => {
  const productsId = await productModel.getById(id);
  if (!productsId) {
    return { message: 'Product not found', status: 404 };
  }
  return productsId;
};

const createProduct = async ({ name, quantity }) => {
  const newProduct = await productModel.createProduct({ name, quantity });
  if (newProduct.message) {
    return { message: newProduct.message, status: 409 };
  }
  return newProduct;
};

const updateProduct = async ({ id, name, quantity }) => {
  const productId = await productModel.getById(id);
  if (!productId) {
    throw Error('Product not found');
  }
  const upProduct = await productModel.updateProduct({ id, name, quantity });
  return upProduct;
};

const deleteProduct = async (id) => {
  const productId = await productModel.getById(id);
  if (!productId) {
    throw Error('Product not found');
  }

  const delproduct = await productModel.deleteProduct(id);
  return delproduct;
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};

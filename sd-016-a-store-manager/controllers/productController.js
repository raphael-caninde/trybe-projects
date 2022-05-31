const productService = require('../services/productService');

const getAll = async (_req, res) => {
  try {
    const products = await productService.getAll();
    return res.status(200).json(products);
  } catch (err) {
    return res.status(404).json({ message: 'Product not found' });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const productsId = await productService.getById(id);
    if (productsId.message) {
      return res.status(productsId.status).json({ message: productsId.message });
    }
    return res.status(200).json(productsId);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productService.createProduct({ name, quantity });
    if (newProduct.message) {
      return res.status(newProduct.status).json({ message: 'Product already exists' });
    }
    return res.status(201).json(newProduct);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const { id } = req.params;
    const upProduct = await productService.updateProduct({ id, name, quantity });
    return res.status(200).json(upProduct);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(id);
    return res.status(204).end();
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};

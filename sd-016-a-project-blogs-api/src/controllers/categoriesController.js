const categoriesService = require('../services/categoriesService');

const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const create = await categoriesService.createCategory({ name });

    return res.status(201).json(create);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCategories = async (_req, res) => {
  try {
    const categories = await categoriesService.getCategories();
  
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCategory,
  getCategories,
};

const { Category } = require('../database/models');

const createCategory = async ({ name }) => {
  const create = await Category.create({ name });

  return create;
};

const getCategories = async () => {
  const categories = await Category.findAll();

  return categories;
};

module.exports = {
  createCategory,
  getCategories,
};

const salesModel = require('../models/salesModel');

const getSalesAll = async () => {
  const sales = await salesModel.getSalesAll();
  return sales;
};

const getSalesId = async (id) => {
  const salesId = await salesModel.getSalesId(id);
  if (salesId.length === 0) {
    return { message: 'Sale not found', status: 404 };
  }
  return salesId;
};

const createSales = async (sales) => {
  const newsales = await salesModel.createSales(sales);
  return newsales;
};

const updateSales = async (id, sales) => {
  const upSales = await salesModel.updateSales(id, sales);
  return upSales;
};

module.exports = {
  getSalesAll,
  getSalesId,
  createSales,
  updateSales,
};

const salesService = require('../services/salesService');

const getSalesAll = async (req, res) => {
  try {
    const sales = await salesService.getSalesAll();
    return res.status(200).json(sales);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const getSalesId = async (req, res) => {
  try {
    const { id } = req.params;
    const salesId = await salesService.getSalesId(id);
    if (salesId.message) {
      return res.status(salesId.status).json({ message: salesId.message });
    }
    return res.status(200).json(salesId);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
};

const createSales = async (req, res) => {
  try {
    const sales = req.body;
    const newSale = await salesService.createSales(sales);
    return res.status(201).json(newSale);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const updateSales = async (req, res) => {
  try {
    const { id } = req.params;
    const sales = req.body;
    const upSales = await salesService.updateSales(id, sales);
    return res.status(200).json(upSales);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getSalesAll,
  getSalesId,
  createSales,
  updateSales,
};

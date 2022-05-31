const productIdValidator = (req, res, next) => {
  const sales = req.body;
 const find = sales.every((s) => s.productId);

  if (!find) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  next();
};

const quantityValidator = (req, res, next) => {
  const sales = req.body;
  const find = sales.every((s) => s.quantity < 1);
  const findQtt = sales.every((s) => s.quantity);

  if (find) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  if (!findQtt) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

module.exports = {
  quantityValidator,
  productIdValidator,
};

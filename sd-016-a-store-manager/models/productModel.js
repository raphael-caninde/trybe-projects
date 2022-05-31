const connection = require('./mysql-connetion');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return products;
};

const getById = async (id) => {
  const [products] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?', [id],
  );
  return products[0];
};

const createProduct = async ({ name, quantity }) => {
  const findAll = await getAll();
  const filterProduct = findAll.find((product) => product.name === name);
  if (filterProduct) {
    return { message: 'Product already exists' };
  }
  const [{ insertId }] = await connection.execute(
    `INSERT INTO StoreManager.products (name, quantity)
    VALUES (?, ?)`, [name, quantity],
  );

  return {
    id: insertId,
    name,
    quantity,
  };
};

const updateProduct = async ({ id, name, quantity }) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id],
  );

  return {
    id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?', [id],
  );
};

module.exports = {
  getAll,
  getById,
  createProduct,
  updateProduct,
  deleteProduct,
};

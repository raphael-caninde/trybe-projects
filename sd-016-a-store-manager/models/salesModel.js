const connection = require('./mysql-connetion');

const getSalesAll = async () => {
  const [sales] = await connection.execute(
    `SELECT S.id AS saleId, S.date, SP.product_id AS productId, SP.quantity
    FROM StoreManager.sales AS S
    INNER JOIN StoreManager.sales_products AS SP
    ON S.id = SP.sale_id
    ORDER BY S.id`,
  );
  return sales;
};

const getSalesId = async (id) => {
  const [sales] = await connection.execute(
    `SELECT S.date, SP.product_id AS productId, SP.quantity FROM StoreManager.sales AS S
    INNER JOIN StoreManager.sales_products AS SP
    ON S.id = SP.sale_id WHERE S.id = ?`, [id],
  );
  return sales;
};

const createSales = async (sales) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW())',
  );

  const dataSales = sales.map(({ productId, quantity }) =>
    connection.execute(
      `INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES (?, ?, ?)`,
      [insertId, productId, quantity],
    ));

  await Promise.all(dataSales);

  return {
    id: insertId,
    itemsSold: sales,
  };
};

const updateSales = async (id, sales) => {
  const upSales = sales.map(({ productId, quantity }) =>
    connection.execute(
      `UPDATE StoreManager.sales_products SET quantity = ?
      WHERE sale_id = ? AND product_id = ?`,
      [quantity, id, productId],
    ));

    await Promise.all(upSales);

    return {
      saleId: id,
      itemUpdated: sales,
    };
};

module.exports = {
  getSalesAll,
  getSalesId,
  createSales,
  updateSales,
};

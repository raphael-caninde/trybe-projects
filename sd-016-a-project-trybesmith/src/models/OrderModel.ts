import connection from './connection';
import IOrder from '../interfaces/IOrder';

export default class OrderModel {
  public getOrder = async ():Promise<IOrder[]> => {
    const [order] = await connection.execute(
      /* `SELECT o.id, o.userId, pr.id AS productsIds
      FROM Trybesmith.Orders AS o
      INNER JOIN Trybesmith.Products AS pr
      ON o.id = pr.orderId;` */
      'SELECT * FROM Trybesmith.Orders;',
    );

    return order as IOrder[];
  };
}

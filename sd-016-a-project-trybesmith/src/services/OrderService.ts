import IOrder from '../interfaces/IOrder';
import OrderModel from '../models/OrderModel';
import ProducstModel from '../models/ProductModel';

export default class OrderService {
  public orderModel = new OrderModel();

  public productModel = new ProducstModel();

  public getOrders = async ():Promise<IOrder[]> => {
    const allOrders = await this.orderModel.getOrder();
    const allProducts = await this.productModel.getAllProducts();

    const orders = allOrders.map((order) => {
      const productsIds = allProducts.filter((product) => product.orderId === order.id)
        .map((prod) => prod.id);

      return { ...order, productsIds };
    });

    console.log(orders);

    return orders;
  };
}
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import OrderService from '../services/OrderService';

export default class OrderController {
  public orderService = new OrderService();

  public getOrders = async (req: Request, res: Response):Promise<Response | undefined> => {
    try {
      const orders = await this.orderService.getOrders();
      
      return res.status(StatusCodes.OK).json(orders);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
      }
    }
  };
}

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ProductsService from '../services/ProductService';

export default class ProductController {
  public productService = new ProductsService();

  public getAllProducts = async (req: Request, res: Response):Promise<Response | void> => {
    try {
      const allProducts = await this.productService.getAllProduct();
  
      return res.status(StatusCodes.OK).json(allProducts);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
      }
    }
  };

  public createProduct = async (req: Request, res: Response) => {
    const data = req.body;

    try {
      const create = await this.productService.createProduct(data);

      return res.status(StatusCodes.CREATED).json(create);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
      }
    }
  };
}

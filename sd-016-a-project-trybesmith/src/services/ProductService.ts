import ProducstModel from '../models/ProductModel';
import IProduct from '../interfaces/IProduct';

export default class ProductService {
  public productModel = new ProducstModel();

  public getAllProduct = async ():Promise<IProduct[]> => {
    const allProducts = await this.productModel.getAllProducts();

    return allProducts;
  };

  public createProduct = async (data: IProduct):Promise<IProduct> => {
    const create = await this.productModel.createProduct(data);

    return create;
  };
}

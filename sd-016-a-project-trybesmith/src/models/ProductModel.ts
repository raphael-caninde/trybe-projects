import { ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import IProduct from '../interfaces/IProduct';

export default class ProductModel {
  public getAllProducts = async ():Promise<IProduct[]> => {
    const [product] = await connection.execute(
      'SELECT * FROM Trybesmith.Products;',
    );
  
    return product as IProduct[];
  };

  public createProduct = async (data: IProduct):Promise<IProduct> => {
    const { name, amount } = data;
    const [product] = await connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?);',
      [name, amount],
    );

    return { id: product.insertId, name, amount };
  };
}

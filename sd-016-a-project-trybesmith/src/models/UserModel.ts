import { ResultSetHeader } from 'mysql2/promise';
import connection from './connection';
import { IUser } from '../interfaces/IUser';

export default class UserModel {
  public createUser = async (user: IUser):Promise<IUser> => {
    const { username, classe, level, password } = user;

    const [newUser] = await connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?);',
      [username, classe, level, password],
    );

    return { id: newUser.insertId, username, classe, level, password };
  };
}

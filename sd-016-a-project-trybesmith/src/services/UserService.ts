import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserModel from '../models/UserModel';
import { IUser, IToken } from '../interfaces/IUser';

dotenv.config();
const JWTSECRET = process.env.JWT_SECRET || 'minhasenha';

export default class UserService {
  public userModel = new UserModel();

  public createUser = async (user: IUser): Promise<IToken> => {
    const newUser = await this.userModel.createUser(user);

    const token = jwt.sign({ id: newUser.id }, JWTSECRET, {
      expiresIn: '7d',
      algorithm: 'HS256',
    });

    return { token };
  };
}

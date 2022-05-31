import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserService from '../services/UserService';

export default class UserController {
  public userService = new UserService();

  public createUser = async (req: Request, res: Response):Promise<Response | void> => {
    const user = req.body;

    try {
      const create = await this.userService.createUser(user);

      return res.status(StatusCodes.CREATED).json(create);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
      }
    }
  };
}

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const validUsername = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  console.log(username);

  if (!username) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: '"username" is required' });
  }

  if (username.length < 3) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: '"username" length must be at least 3 characters long',
    });
  }

  if (typeof username !== 'string') {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: '"username" must be a string',
    });
  }

  next();
};

export default validUsername;

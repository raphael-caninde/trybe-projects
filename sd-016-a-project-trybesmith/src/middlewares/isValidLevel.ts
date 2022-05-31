import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const validLevel = (req: Request, res: Response, next: NextFunction) => {
  const { level } = req.body;

  if (level <= 0) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: '"level" must be greater than or equal to 1',
    });
  }

  if (!level) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: '"level" is required',
    });
  }

  if (typeof level !== 'number') {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      message: '"level" must be a number',
    });
  }

  next();
};

export default validLevel;

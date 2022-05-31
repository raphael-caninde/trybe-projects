import { Router } from 'express';
import UserController from '../controllers/UserController';
import isValidName from '../middlewares/isValidName';
import isValidClasse from '../middlewares/isValidClasse';
import isValidLevel from '../middlewares/isValidLevel';
import isValidPassword from '../middlewares/isValidPassword';

const userController = new UserController();

const router = Router();

router.post(
  '/',
  isValidName, 
  isValidClasse,
  isValidLevel,
  isValidPassword,
  userController.createUser,
);

export default router;

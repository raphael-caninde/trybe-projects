import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import validateName from '../middlewares/isValidProduct';
import validateAmount from '../middlewares/isvalidAmount';

const productController = new ProductController();

const router = Router();

router.get('/', productController.getAllProducts);
router.post('/', validateName, validateAmount, productController.createProduct);

export default router;

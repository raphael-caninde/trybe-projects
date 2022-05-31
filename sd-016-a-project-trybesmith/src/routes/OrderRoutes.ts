import { Router } from 'express';
import OrderController from '../controllers/OrderController';

const orderController = new OrderController();

const router = Router();

router.get('/', orderController.getOrders);

export default router;

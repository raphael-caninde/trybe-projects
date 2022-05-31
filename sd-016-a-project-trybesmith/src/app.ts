import express from 'express';
import ProductsRouter from './routes/ProductsRouters';
import UserRoutes from './routes/UserRoutes';
import OrderRoutes from './routes/OrderRoutes';

const app = express();

app.use(express.json());

app.use('/products', ProductsRouter);
app.use('/users', UserRoutes);
app.use('/orders', OrderRoutes);

export default app;

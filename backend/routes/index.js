import { Router } from 'express';
import { getAllProducts, createProduct, deleteProduct } from '../controllers/productController.js'; 
import { createOrderController } from '../controllers/paymentController.js';
const router = Router();

router.get('/product',getAllProducts);
router.post('/product',createProduct);
router.delete('/product/:id',deleteProduct);
router.post('/create-order', createOrderController);

export default router; 
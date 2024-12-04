import express from 'express';
import {
    createOrder,
    updateOrder,
    getOrders,
    getRecentOrders,
    getUserOrders,
    getUsersByProduct,
} from '../controllers/order.controller';

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Update an existing order
router.put('/:id', updateOrder);

// Get all orders
router.get('/', getOrders);

// Get recent orders (last 7 days)
router.get('/recent', getRecentOrders);

// Get orders of a specific user
router.get('/user/:userId', getUserOrders);

router.get('/product/:productId/users', getUsersByProduct);

export default router;

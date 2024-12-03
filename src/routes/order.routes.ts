import express from 'express';
import {
    createOrder,
    updateOrder,
    getOrders,
} from '../controllers/order.controller';

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Update an existing order
router.put('/:id', updateOrder);

// Get all orders
router.get('/', getOrders);

export default router;

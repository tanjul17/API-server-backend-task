import { Request, Response } from 'express';
import Order from '../models/order.model';
import Product from '../models/product.model';

// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user, product, quantity } = req.body;

        // Check if product exists
        const productItem = await Product.findById(product);
        if (!productItem) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        // Check stock availability
        if (productItem.stockQuantity < quantity) {
            res.status(400).json({ error: 'Insufficient stock' });
            return;
        }

        // Create order
        const order = await Order.create({ user, product, quantity });

        // Update product stock
        productItem.stockQuantity -= quantity;
        await productItem.save();

        res.status(201).json(order);
    } catch (error: any) {
        res.status(500).json({ error: 'Error creating order', details: error.message });
    }
};

// Update an existing order
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const order = await Order.findById(id);
        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        // Adjust stock levels
        const product = await Product.findById(order.product);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }

        // Calculate stock adjustment
        const stockAdjustment = quantity - order.quantity;

        if (product.stockQuantity - stockAdjustment < 0) {
            res.status(400).json({ error: 'Insufficient stock for update' });
            return;
        }

        // Update stock and order
        product.stockQuantity -= stockAdjustment;
        await product.save();

        order.quantity = quantity;
        await order.save();

        res.status(200).json(order);
    } catch (error: any) {
        res.status(500).json({ error: 'Error updating order', details: error.message });
    }
};

// Get all orders
export const getOrders = async (_req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('product', 'name price');
        res.status(200).json(orders);
    } catch (error: any) {
        res.status(500).json({ error: 'Error fetching orders', details: error.message });
    }
};

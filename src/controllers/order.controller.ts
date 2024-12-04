import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Order from '../models/order.model';
import Product from '../models/product.model';

// Create a new order
export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        const { user, product, quantity } = req.body;

        // Validate product ID
        if (!mongoose.Types.ObjectId.isValid(product)) {
            res.status(400).json({ error: 'Invalid product ID' });
            return;
        }

        // Find the product
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

        // Create the order
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

        // Validate order ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(400).json({ error: 'Invalid order ID' });
            return;
        }

        // Find the order
        const order = await Order.findById(id);
        if (!order) {
            res.status(404).json({ error: 'Order not found' });
            return;
        }

        // Find the product
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

// Get orders placed in the last 7 days
export const getRecentOrders = async (_req: Request, res: Response): Promise<void> => {
    try {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentOrders = await Order.find({ orderDate: { $gte: sevenDaysAgo } })
            .populate('user', 'name email')
            .populate('product', 'name price');

        res.status(200).json(recentOrders);
    } catch (error: any) {
        res.status(500).json({ error: 'Error fetching recent orders', details: error.message });
    }
};
// Get orders of a specific user
export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const userOrders = await Order.find({ user: userId })
            .populate('user', 'name email')
            .populate('product', 'name price');

        if (userOrders.length === 0) {
            res.status(404).json({ error: 'No orders found for this user' });
            return;
        }

        res.status(200).json(userOrders);
    } catch (error: any) {
        res.status(500).json({ error: 'Error fetching user orders', details: error.message });
    }
};
// Get users who bought a specific product
export const getUsersByProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { productId } = req.params;

        // Find all orders for the specified product
        const orders = await Order.find({ product: productId }).populate('user', 'name email');

        if (orders.length === 0) {
            res.status(404).json({ error: 'No users found for this product' });
            return;
        }

        // Extract unique users
        const uniqueUsers = Array.from(
            new Map(orders.map(order => [(order.user as any)._id.toString(), order.user])).values()
        );

        res.status(200).json(uniqueUsers);
    } catch (error: any) {
        res.status(500).json({ error: 'Error fetching users for the product', details: error.message });
    }
};

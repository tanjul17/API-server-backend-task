import { Request, Response } from 'express';
import Product from '../models/product.model';

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.create(req.body);
        res.status(201).json(product);
    } catch (error: any) {
        res.status(500).json({ error: 'Error creating product', details: error.message });
    }
};

// Update an existing product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ error: 'Error updating product', details: error.message });
    }
};

// Get all products
export const getProducts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error: any) {
        res.status(500).json({ error: 'Error fetching products', details: error.message });
    }
};

// Get a product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.status(200).json(product);
    } catch (error: any) {
        res.status(500).json({ error: 'Error fetching product', details: error.message });
    }
};

// Get total stock quantity
export const getTotalStockQuantity = async (_req: Request, res: Response): Promise<void> => {
    try {
        const totalStock = await Product.aggregate([
            { $group: { _id: null, totalStock: { $sum: '$stockQuantity' } } },
        ]);
        res.status(200).json({ totalStock: totalStock[0]?.totalStock || 0 });
    } catch (error: any) {
        res.status(500).json({ error: 'Error calculating total stock quantity', details: error.message });
    }
};
// Get total stock quantity for all products combined
 export const getTotalStock = async (_req: Request, res: Response): Promise<void> => {
     try {
         const totalStock = await Product.aggregate([
             {
                 $group: {
                     _id: null, // Group all documents together
                     totalStock: { $sum: '$stockQuantity' }, // Sum the stockQuantity field
                 },
             },
         ]);
 
         res.status(200).json({ totalStock: totalStock[0]?.totalStock || 0 });
     } catch (error: any) {
         res.status(500).json({ error: 'Error calculating total stock', details: error.message });
     }
 };
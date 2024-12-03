import express from 'express';
import {
    createProduct,
    updateProduct,
    getProducts,
    getProductById,
    getTotalStockQuantity,
} from '../controllers/product.controller';
import { validateId } from '../middleware/validateId';

const router = express.Router();

// Create a new product
router.post('/', createProduct);

// Update a product (validate ID)
router.put('/:id', validateId, updateProduct);

// Get all products
router.get('/', getProducts);

// Get a product by ID (validate ID)
router.get('/:id', validateId, getProductById);

// Get total stock quantity
router.get('/total-stock', getTotalStockQuantity);

export default router;

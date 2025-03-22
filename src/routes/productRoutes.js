import express from 'express';
import { getAllProducts, getProductsByCategory } from '../controllers/productController.js';
import { validateCategory } from '../middleware/validators.js';

const router = express.Router();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Fetch all available products
 *     responses:
 *       200:
 *         description: Success - Returns an array of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   name:
 *                     type: string
 *                     example: "Laptop"
 *                   price:
 *                     type: number
 *                     example: 1200.99
 *       500:
 *         description: Server error
 */
router.get('/', getAllProducts);

/**
 * @swagger
 * /api/products/{category}:
 *   get:
 *     summary: Get products by category
 *     description: Fetch products based on the given category
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Category name (e.g., "electronics", "clothing")
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success - Returns an array of products in the category
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "2"
 *                   name:
 *                     type: string
 *                     example: "Smartphone"
 *                   price:
 *                     type: number
 *                     example: 699.99
 *       400:
 *         description: Bad request - Invalid category
 *       500:
 *         description: Server error
 */
router.get('/:category', validateCategory, getProductsByCategory);

export default router;

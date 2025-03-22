import express from 'express';
import { getAllProducts, getProductsByCategory } from '../controllers/productController.js';
import { validateCategory } from '../middleware/validators.js';

const router = express.Router();

router.get('/', getAllProducts);

/**
 * @swagger
 * /api/products/{category}:
 *   get:
 *     summary: Get products by category
 *     description: Fetch products by category
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Category name (e.g., "electronics")
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success - Returns an array of products
 *       400:
 *         description: Bad request - Invalid category
 *       500:
 *         description: Server error
 */
router.get('/:category', validateCategory, getProductsByCategory);

export default router;

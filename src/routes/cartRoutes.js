import express from 'express';
import { addToCart, getCartItems } from '../controllers/cartController.js';
import { validateAddToCart } from '../middleware/validators.js';

const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a product to cart
 *     description: Adds a product to the cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added to cart
 *       400:
 *         description: Bad request - Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', validateAddToCart, addToCart);

router.get('/', getCartItems);

export default router;

import express from 'express';
import { addToCart, getCartItems } from '../controllers/cartController.js';
import { validateAddToCart } from '../middleware/validators.js';

const router = express.Router();

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Add a product to the cart
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
 *                 example: "12345"
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Product added to cart successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Product added to cart"
 *       400:
 *         description: Bad request - Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', validateAddToCart, addToCart);

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Get all cart items
 *     description: Fetch all items currently in the cart
 *     responses:
 *       200:
 *         description: Success - Returns an array of cart items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   productId:
 *                     type: string
 *                     example: "12345"
 *                   name:
 *                     type: string
 *                     example: "Laptop"
 *                   quantity:
 *                     type: integer
 *                     example: 1
 *                   price:
 *                     type: number
 *                     example: 1200.99
 *       500:
 *         description: Server error
 */
router.get('/', getCartItems);

export default router;

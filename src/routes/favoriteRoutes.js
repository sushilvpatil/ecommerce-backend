import express from 'express';
import { addToFavorites, getFavoriteItems } from '../controllers/favoriteController.js';
import { validateAddToFavorites } from '../middleware/validators.js';

const router = express.Router();

/**
 * @swagger
 * /api/favorites:
 *   post:
 *     summary: Add a product to favorites
 *     description: Adds a product to the favorites list
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
 *         description: Product added to favorites
 *       200:
 *         description: Product already in favorites
 *       400:
 *         description: Invalid product ID format
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
router.post('/', validateAddToFavorites, addToFavorites);

/**
 * @swagger
 * /api/favorites:
 *   get:
 *     summary: Get favorite products
 *     description: Retrieve all favorite products with details
 *     responses:
 *       200:
 *         description: List of favorite products
 *       500:
 *         description: Server error
 */
router.get('/', getFavoriteItems);

export default router;

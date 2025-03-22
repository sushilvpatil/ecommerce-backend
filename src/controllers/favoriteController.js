import mongoose from 'mongoose';
import Favorite from '../models/favoriteModel.js';
import Product from '../models/productModel.js';

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
export const addToFavorites = async (req, res) => {
    try {
        const { productId } = req.body;

        // ✅ Validate if productId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: 'Invalid product ID format' });
        }

        // ✅ Check if the product exists
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // ✅ Prevent duplicate entries
        let favoriteItem = await Favorite.findOne({ productId });
        if (favoriteItem) {
            return res.status(200).json({ message: 'Product already in favorites' });
        }

        // ✅ Save valid favorite item
        favoriteItem = new Favorite({ productId });
        await favoriteItem.save();

        res.status(201).json({ message: 'Product added to favorites' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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
export const getFavoriteItems = async (req, res) => {
    try {
        const favoriteItems = await Favorite.find({ productId: { $ne: null } }) // Ignore null values
            .populate({
                path: 'productId',
                select: 'name category price image'
            });

        res.status(200).json(favoriteItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

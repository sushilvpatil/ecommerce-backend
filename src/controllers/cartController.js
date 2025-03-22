import mongoose from 'mongoose';
import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js';  // Import Product model

// Add to Cart
export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;

        // ✅ Validate if productId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: 'Invalid product ID format' });
        }

        // ✅ Check if the product exists in the database
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // ✅ Check if product is already in cart and update quantity
        let cartItem = await Cart.findOne({ productId });
        if (cartItem) {
          return res.status(200).json({ message: 'Product already in cart' });
        } else {
            cartItem = new Cart({ productId });
        }
        await cartItem.save();

        res.status(201).json({ message: 'Product added to cart' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Cart Items
export const getCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find().populate('productId');  // Populating the product details
        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

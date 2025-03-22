import { body, param, validationResult } from 'express-validator';

// Middleware to handle validation errors
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Validation rules for adding a product to the cart
export const validateAddToCart = [
    body('productId').notEmpty().withMessage('Product ID is required'),
    validate,
];

// Validation rules for adding a product to favorites
export const validateAddToFavorites = [
    body('productId').notEmpty().withMessage('Product ID is required'),
    validate,
];

// Validation rules for category parameter
export const validateCategory = [
    param('category').notEmpty().withMessage('Category is required'),
    validate,
];

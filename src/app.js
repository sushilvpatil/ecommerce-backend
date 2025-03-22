import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import favoriteRoutes from './routes/favoriteRoutes.js';
import setupSwagger from './config/swagger.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();

// ✅ Enable CORS for all origins (Allow all requests)
app.use(cors());

// ✅ General Middleware
app.use(express.json());
app.use(morgan('dev'));

// ✅ Setup Swagger
setupSwagger(app);

// ✅ Routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favorites', favoriteRoutes);

// ✅ Global Error Handling Middleware
app.use(errorHandler);

export default app;

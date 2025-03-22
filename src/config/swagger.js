import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Swagger options
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'E-commerce API',
            version: '1.0.0',
            description: 'API documentation for the E-commerce backend',
        },
        servers: [
            {
                url: 'https://ecommerce-backend-5-ocnz.onrender.com', // Live Render URL
                description: 'Live server',
            },
            {
                url: 'http://localhost:8080', // Local Development
                description: 'Local server',
            },
        ],
    },
    apis: [`${__dirname}/../routes/*.js`], // Path to API routes
};

// Generate Swagger documentation
const swaggerSpec = swaggerJSDoc(options);

const setupSwagger = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;

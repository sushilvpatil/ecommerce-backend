import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';

dotenv.config();
//accessing the port from the environment variable
const PORT = process.env.PORT || 8080;

// Start Server
connectDB();
app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);
});

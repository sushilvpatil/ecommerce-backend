// Import necessary modules
import mongoose from 'mongoose'; // MongoDB ODM to interact with the database
import dotenv from 'dotenv'; // For environment variable management
import { fileURLToPath } from 'url'; // Helps resolve module file paths
import { dirname, join } from 'path'; // Provides utilities for working with file and directory paths

// Resolve the current file path (__filename) and directory path (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from the .env file located at the project root
dotenv.config({ path: join(__dirname, '../../.env') });

/**
 * Function to establish a connection to MongoDB
 */
const connectDB = async () => {
  try {
    // Check if MONGO_URI is defined in environment variables
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    // Connect to MongoDB using MONGO_URI from the environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Log successful database connection
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // Log error and exit the process if connection fails
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

// Export the database connection function to be used in other files
export default connectDB;

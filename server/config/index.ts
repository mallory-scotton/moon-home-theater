// Dependencies
import dotenv from 'dotenv';

// Query the environnement configuration
dotenv.config();

// Export configuration
export const PORT = process.env.PORT || 45455;

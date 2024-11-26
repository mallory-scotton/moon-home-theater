// Dependencies
import { config } from 'dotenv';

// Query the environnement configuration
config();

// Export configuration
export const PORT = process.env.PORT || 45455;

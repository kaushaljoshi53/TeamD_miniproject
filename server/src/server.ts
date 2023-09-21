// Import required modules
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import router from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import projectRoutes from './routes/projectRoutes'
import { dbConnect } from './database/dbConnect';

// Initialize Express application
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse JSON request bodies
app.use(express.json());

// Use the defined router for routing requests
app.use(router);
app.use(eventRoutes);
app.use(projectRoutes);

// Create an HTTP server
const httpServer = http.createServer(app);

// Load environment variables from a .env file
dotenv.config();

// Define the port number for the server
const PORT = process.env.PORT || 8080;

// Start the HTTP server
httpServer.listen(PORT, () => {
    console.log(`Server running on port - ${PORT}`);
});

// Connect to the database
dbConnect();

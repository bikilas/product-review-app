// src/server.ts
import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products'; // Import the products routes

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Use the product routes
app.use(productsRouter);

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

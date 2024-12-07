import express, { Request, Response } from 'express';
import cors from 'cors';

// Define Product interface to type the data
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

// Create the router
const router = express.Router();

// Sample in-memory data
let products: Product[] = [
  { id: 1, title: 'Product 1', description: 'Description 1', price: 100, imageUrl: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Product 2', description: 'Description 2', price: 200, imageUrl: 'https://via.placeholder.com/150' }
];

// Middleware setup for CORS and JSON parsing
router.use(cors());
router.use(express.json());

// Get all products
router.get('/api/products', (_req: Request, res: Response) => {
  res.json(products);
});

// Get a single product by ID
router.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

// Create a new product
router.post('/api/products', (req: Request, res: Response) => {
  const { title, description, price, imageUrl }: Product = req.body;
  if (!title || !description || !price || !imageUrl) {
    return res.status(400).send('Missing required fields');
  }
  const newProduct: Product = { id: Date.now(), title, description, price, imageUrl };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Update an existing product by ID
router.put('/api/products/:id', (req: Request, res: Response) => {
  const { title, description, price, imageUrl }: Product = req.body;
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Product not found');

  if (!title || !description || !price || !imageUrl) {
    return res.status(400).send('Missing required fields');
  }

  products[index] = { ...products[index], title, description, price, imageUrl };
  res.json(products[index]);
});

// Delete a product by ID
router.delete('/api/products/:id', (req: Request, res: Response) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Product not found');

  products.splice(index, 1);
  res.status(204).send();
});

export default router;

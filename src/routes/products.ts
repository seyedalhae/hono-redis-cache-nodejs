import { Hono } from 'hono';
import { cache } from '../middleware/cache';

const products = new Hono();

// Sample product data (replace with database in production)
const productsList = [
    { id: 1, name: 'Product 1', price: 99.99 },
    { id: 2, name: 'Product 2', price: 149.99 },
    { id: 2, name: 'Product 222', price: 149.99 },
    { id: 2, name: 'Product 2222', price: 149.99 },
    { id: 2, name: 'Product 22222', price: 149.99 },
];

products.get('/', cache, (c) => {
    return c.json(productsList);
});

products.get('/:id', cache, (c) => {
    const id = parseInt(c.req.param('id'));
    const product = productsList.find(p => p.id === id);

    if (!product) {
        return c.json({ error: 'Product not found' }, 404);
    }

    return c.json(product);
});

export default products;

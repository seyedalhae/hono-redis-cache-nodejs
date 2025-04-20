import { Hono } from 'hono';
import { authMiddleware } from '../middleware/auth';

const cart = new Hono();

// Sample cart data (replace with database in production)
const carts = new Map();

cart.use('*', authMiddleware);

cart.get('/', (c) => {
    const userId = c.get('user').id;
    return c.json(carts.get(userId) || []);
});

cart.post('/add', async (c) => {
    const userId = c.get('user').id;
    const { productId, quantity } = await c.req.json();

    const userCart = carts.get(userId) || [];
    userCart.push({ productId, quantity });
    carts.set(userId, userCart);

    return c.json({ message: 'Item added to cart' });
});

export default cart;

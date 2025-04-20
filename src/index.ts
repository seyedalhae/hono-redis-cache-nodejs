import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import dotenv from 'dotenv';
import products from './routes/products';
import cart from './routes/cart';
import auth from './routes/auth';

dotenv.config();

const app = new Hono();

app.use('*', logger());

app.route('/products', products);
app.route('/cart', cart);
app.route('/auth', auth);

const port = parseInt(process.env.PORT!) || 3000;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port
});

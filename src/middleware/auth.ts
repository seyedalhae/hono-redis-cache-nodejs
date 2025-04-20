import { Context, Next } from 'hono';
import jwt from 'jsonwebtoken';

export async function authMiddleware(c: Context, next: Next) {
    const token = c.req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return c.json({ error: 'No token provided' }, 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        c.set('user', decoded);
        await next();
    } catch (error) {
        return c.json({ error: 'Invalid token' }, 401);
    }
}

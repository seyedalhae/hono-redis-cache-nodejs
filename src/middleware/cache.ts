import { Context, Next } from 'hono';
import redisClient from '../utils/redis';

export const cache = async (c: Context, next: Next) => {
    const key = `cache:${c.req.url}`;
    const cached = await redisClient.get(key);

    console.log(`Cache key: ${key}`);
    console.log(`Cache: ${cached}`);

    if (cached) {
        return c.json(JSON.parse(cached));
    }

    await next();

    const response = c.res;
    if (response.status === 200) {
        const body = await response.json();
        await redisClient.set(key, JSON.stringify(body), { EX: 30 });
        c.res = new Response(JSON.stringify(body), response);
    }
};

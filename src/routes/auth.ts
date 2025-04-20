import { Hono } from 'hono';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const auth = new Hono();
const prisma = new PrismaClient();

// Combined register/login route
auth.post('/auth', async (c) => {
    const { email, password } = await c.req.json();

    try {
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            // Register new user
            const hashedPassword = await bcrypt.hash(password, 10);
            user = await prisma.user.create({
                data: { email, password: hashedPassword }
            });

            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
            return c.json({ token, message: 'User registered successfully' });
        }

        // Login existing user
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            return c.json({ error: 'Invalid password' }, 401);
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return c.json({ token, message: 'Login successful' });
    } catch (error) {
        return c.json({ error: 'Internal server error' }, 500);
    }
});

// Forgot password route
auth.post('/forgot-password', async (c) => {
    const { email } = await c.req.json();

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return c.json({ error: 'User not found' }, 404);
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        await prisma.user.update({
            where: { email },
            data: { resetToken, resetTokenExpiry }
        });

        // TODO: Send email with reset token
        return c.json({ message: 'Password reset instructions sent to email' });
    } catch (error) {
        return c.json({ error: 'Internal server error' }, 500);
    }
});

// Reset password route
auth.post('/reset-password', async (c) => {
    const { token, newPassword } = await c.req.json();

    try {
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gt: new Date() }
            }
        });

        if (!user) {
            return c.json({ error: 'Invalid or expired reset token' }, 400);
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null
            }
        });

        return c.json({ message: 'Password reset successful' });
    } catch (error) {
        return c.json({ error: 'Internal server error' }, 500);
    }
});

export default auth;

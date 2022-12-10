import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import db from '../config/db.js';

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await db
                .select('*')
                .from('users')
                .where({ user_id: decoded.id });
            // Hash should not be sent with
            delete user[0].hash;
            req.user = user;
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

export { protect };

// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "secret"; // Ensure to use a secure key

export const generateToken = (payload: any) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
};

export const verifyToken = (requiredRole: string) => (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;

        if (user.role !== requiredRole) {
            return res.status(403).json({
                message: 'You do not have the authorization and permissions to access this resource.'
            });
        }

        next();
    });
};

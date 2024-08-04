// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "secret"; // Ensure to use a secure key

export const generateToken = (payload: any) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
};


export const verifyToken = (requiredRoles: string | string[]) => (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token; // Recupera il token dai cookie

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = user;

        const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

        // Verifica se il ruolo dell'utente è incluso nei ruoli richiesti
        if (!roles.includes(user.role)) {
            return res.status(403).json({
                message: 'You do not have the authorization and permissions to access this resource.'
            });
        }

        next();
    });
};

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    console.log('Token:', token);
    if (token == null) return res.sendStatus(401); // Token non trovato

    jwt.verify(token, secretKey, (err: any, user: any) => {
        if (err) return res.sendStatus(403); // Token non valido
        req.user = user;
        next();
    });
};

// authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import client from "../routes/Client";

const secretKey = process.env.JWT_SECRET || "secret"; // Ensure to use a secure key

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, secretKey, (err: any, client: any) => {
        //print token as string
        console.log(token);
        if (err) {
            return res.sendStatus(403);
        }

        next();
    });
};

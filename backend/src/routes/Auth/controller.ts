// authController.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import ClientRepository from "../../repositories/ClientRepository";
import client from "../Client";

const secretKey = process.env.JWT_SECRET || "secret";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const repository = new ClientRepository();
        const client = await repository.findByEmail(email);

        if (!client) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, client.pw);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: client.id, email: client.email }, secretKey, {
            expiresIn: "1h", // Token validity duration
        });

        res.status(200).json({ token: token });
    } catch (error: any) {
        next(error);
    }
};

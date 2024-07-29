// authController.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import UserRepository from "../../repositories/UserRepository";
import User from "../User";
import { generateToken } from "../../middleware/authMiddleware";

const secretKey = process.env.JWT_SECRET || "secret";

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const repository = new UserRepository();
        const user = await repository.findByEmail(email);

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.pw);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = generateToken({ userId: user.id, email: user.email, role: user.role });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Solo su HTTPS in produzione
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 giorno
        });



        res.status(200).json({ message: "Logged in successfully" });
    } catch (error: any) {
        next(error);
    }
};

export const logout = (req: Request, res: Response) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0) // Imposta la data di scadenza al passato
    });
    res.status(200).json({ message: 'Logged out successfully' });
};

export const getUserInfo = (req: Request, res: Response) => {
    const user = req.user;
    res.json(user);
};

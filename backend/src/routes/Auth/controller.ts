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



        res.status(200).json({ role: user.role, token: token });
    } catch (error: any) {
        next(error);
    }
};

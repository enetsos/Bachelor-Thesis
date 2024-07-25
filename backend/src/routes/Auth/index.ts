import express, { Router } from "express";
import { login, logout, getUserInfo } from "./controller";
import { authenticateToken } from "../../middleware/authMiddleware";

const authRouter: Router = express.Router();

authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/user-info", authenticateToken, getUserInfo);


export default authRouter;

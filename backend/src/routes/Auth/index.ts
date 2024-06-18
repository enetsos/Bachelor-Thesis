import express, { Router } from "express";
import { login } from "./controller";

const authRouter: Router = express.Router();

authRouter.post("/", login);

export default authRouter;

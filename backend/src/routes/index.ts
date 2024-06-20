import express, { Router } from "express";
import user from "./User";
import authRouter from "./Auth";

const router: Router = express.Router();

router.use("/users", user);
router.use("/login", authRouter);

export default router;
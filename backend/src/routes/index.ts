import express, { Router } from "express";
import client from "./Client";
import authRouter from "./Auth";

const router: Router = express.Router();

router.use("/clients", client);
router.use("/login", authRouter);

export default router;
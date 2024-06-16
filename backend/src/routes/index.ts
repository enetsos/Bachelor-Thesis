import express, { Router } from "express";
import client from "./Client";

const router: Router = express.Router();

router.use("/clients", client);

export default router;
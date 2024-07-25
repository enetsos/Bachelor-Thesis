import express, { Router } from "express";
import user from "./User";
import authRouter from "./Auth";
import timeTrackingRouter from "./TimeTracking";

const router: Router = express.Router();

router.use("/users", user);
router.use("/login", authRouter);
router.use("/time-tracking", timeTrackingRouter);

export default router;
import express, { Router } from "express";
import user from "./User";
import authRouter from "./Auth";
import timeTrackingRouter from "./TimeTracking";
import supplyRouter from "./Supply";
import timeTrackingSupplyRouter from "./TimeTrackingSupply";

const router: Router = express.Router();

router.use("/users", user);
router.use("/auth", authRouter);
router.use("/time-tracking", timeTrackingRouter);
router.use("/supply", supplyRouter);
router.use("/time-tracking-supply", timeTrackingSupplyRouter);

export default router;
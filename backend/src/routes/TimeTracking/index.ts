import express, { Router } from "express";
import { createTimeTracking, getTimeTrackingByclient } from "./controller";
import { verifyToken } from "../../middleware/authMiddleware";

const authRouter: Router = express.Router();

authRouter.post("/newTime", verifyToken('employee'), createTimeTracking);
authRouter.get("/getTime/:clientId", verifyToken('employee'), getTimeTrackingByclient);

export default authRouter;

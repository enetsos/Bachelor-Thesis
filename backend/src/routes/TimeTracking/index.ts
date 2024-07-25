import express, { Router } from "express";
import { createTimeTracking, getAllTimeTrackings, getTimeTrackingByClientId, getTimeTrackingByEmployeeId } from "./controller";
import { verifyToken } from "../../middleware/authMiddleware";
import { createTimeTrackingSchema } from "../../middleware/requestSchemas";
import validateRequest from "../../middleware/validateRequest";

const timeTrackingRouter: Router = express.Router();

timeTrackingRouter.post("/new-time", validateRequest(createTimeTrackingSchema), verifyToken('employee'), createTimeTracking);

timeTrackingRouter.get("/get-all-time", verifyToken('employee'), getAllTimeTrackings);
timeTrackingRouter.get("/get-client-time/:clientId", verifyToken('employee'), getTimeTrackingByClientId);
timeTrackingRouter.get("/get-employee-time/:employeeId", verifyToken('employee'), getTimeTrackingByEmployeeId);

export default timeTrackingRouter;

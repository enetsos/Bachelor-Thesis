import express, { Router } from "express";
import { createTimeTracking, getAllTimeTrackings, getTimeTrackingByClientId, getTimeTrackingByEmployeeId, updateTimeTracking, getTimeById } from "./controller";
import { verifyToken } from "../../middleware/authMiddleware";
import { createTimeTrackingSchema } from "../../middleware/requestSchemas";
import validateRequest from "../../middleware/validateRequest";

const timeTrackingRouter: Router = express.Router();

timeTrackingRouter.post("/new-time", validateRequest(createTimeTrackingSchema), verifyToken(['supervisor', 'employee']), createTimeTracking);

timeTrackingRouter.get("/get-all-time", verifyToken(['supervisor', 'employee']), getAllTimeTrackings);
timeTrackingRouter.get("/get-client-time/:clientId", verifyToken(['supervisor', 'employee']), getTimeTrackingByClientId);
timeTrackingRouter.get("/get-employee-time/:employeeId", verifyToken(['supervisor', 'employee']), getTimeTrackingByEmployeeId);
timeTrackingRouter.get("/get-time/:id", verifyToken(['supervisor', 'employee']), getTimeById);

timeTrackingRouter.put("/stop-time/:id", verifyToken(['supervisor', 'employee']), updateTimeTracking);

export default timeTrackingRouter;

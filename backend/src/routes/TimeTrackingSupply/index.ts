import express, { Router } from "express";
import { addSuppliesToTimeTracking, getSuppliesByTimeTrackingId, getTimeTrackingsBySupplyId } from "./controller";
import { verifyToken } from "../../middleware/authMiddleware";
import { createTimeTrackingSchemaSupply } from "../../middleware/requestSchemas";
import validateRequest from "../../middleware/validateRequest";

const timeTrackingSupplyRouter: Router = express.Router();

timeTrackingSupplyRouter.post(
    "/timetracking/:timeTrackingId/supplies",
    verifyToken(['supervisor', 'employee']),
    addSuppliesToTimeTracking
);

timeTrackingSupplyRouter.get(
    "/timetracking/:timeTrackingId/supplies",
    verifyToken('supervisor'),
    getSuppliesByTimeTrackingId
);

timeTrackingSupplyRouter.get(
    "/supply/:supplyId/timetrackings",
    verifyToken('supervisor'),
    getTimeTrackingsBySupplyId
);

export default timeTrackingSupplyRouter;

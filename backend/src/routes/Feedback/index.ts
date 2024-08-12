import express, { Router } from "express";
import { createFeedback, getAllFeedbacks, getFeedbackByClientId } from "./controller";
import { verifyToken } from "../../middleware/authMiddleware";
import { createFeedbackSchema } from "../../middleware/requestSchemas";
import validateRequest from "../../middleware/validateRequest";

const feedbackRouter: Router = express.Router();

feedbackRouter.post("/new-feedback", validateRequest(createFeedbackSchema), verifyToken('client'), createFeedback);
feedbackRouter.get("/get-all-feedbacks", verifyToken(['admin', 'employee', 'supervisor']), getAllFeedbacks);
feedbackRouter.get("/get-by-client-id/:clientId", verifyToken(['client']), getFeedbackByClientId);

export default feedbackRouter;
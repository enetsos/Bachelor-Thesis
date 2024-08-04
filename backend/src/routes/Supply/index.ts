import express, { Router } from "express";
import { createSupply, getAllSupplies } from "./controller";
import { verifyToken } from "../../middleware/authMiddleware";
import { createSupplySchema } from "../../middleware/requestSchemas";
import validateRequest from "../../middleware/validateRequest";

const supplyRouter: Router = express.Router();

supplyRouter.post("/new-supply", validateRequest(createSupplySchema), verifyToken('admin'), createSupply);
supplyRouter.get("/get-all-supply", verifyToken(['admin', 'employee']), getAllSupplies);


export default supplyRouter;

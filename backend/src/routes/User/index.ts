import express, { Router } from "express";
import {
    listUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserByRole
} from "./controller";
import validateRequest from "../../middleware/validateRequest";
import {
    createUserSchema,
} from "../../middleware/requestSchemas";
import { verifyToken } from "../../middleware/authMiddleware";


const User: Router = express.Router();

User.get("/", verifyToken('admin'), listUsers);
User.get("/role/:role", verifyToken(['admin', 'supervisor']), getUserByRole);

User.get("/:id", getUser);
User.post("/", validateRequest(createUserSchema), verifyToken('admin'), createUser);
User.put("/:id", verifyToken('admin'), updateUser);
User.delete("/:id", deleteUser);

export default User;
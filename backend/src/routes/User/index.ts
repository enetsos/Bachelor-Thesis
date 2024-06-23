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
    updateUserSchema,
} from "../../middleware/requestSchemas";
import { verifyToken } from "../../middleware/authMiddleware";


const User: Router = express.Router();

User.get("/", verifyToken('admin'), listUsers);
User.get("/role/:role", getUserByRole);

User.get("/:id", getUser);
User.post("/", validateRequest(createUserSchema), createUser);
User.put("/:id", validateRequest(updateUserSchema), updateUser);
User.delete("/:id", deleteUser);

export default User;
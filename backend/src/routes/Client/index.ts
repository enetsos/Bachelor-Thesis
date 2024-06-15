import express, { Router } from "express";
import {
    listClients,
    getClient,
    createClient,
    updateClient,
    deleteClient,
} from "./controller";
import validateRequest from "../../middleware/validateRequest";
import {
    createClientSchema,
    updateClientSchema,
} from "../../middleware/requestSchemas";

const client: Router = express.Router();

client.get("/", listClients);
client.get("/:id", getClient);
client.post("/", validateRequest(createClientSchema), createClient);
client.put("/:id", validateRequest(updateClientSchema), updateClient);
client.delete("/:id", deleteClient);

export default client;
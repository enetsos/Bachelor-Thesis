import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";
import { initializePassport } from "./middleware/passport";

export const createServer = () => {
    const app = express();
    app
        .disable("x-powered-by")
        .use(morgan("dev"))
        .use(express.urlencoded({ extended: true }))
        .use(express.json())
        .use(cors())
        .use(initializePassport());

    app.get("/healthz", (req, res) => {
        return res.json({ ok: true, environment: process.env.NODE_ENV });
    });

    app.use("/api/", router);


    return app;
};
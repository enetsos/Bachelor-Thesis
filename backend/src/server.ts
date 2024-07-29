import express from "express";
import morgan from "morgan";
import cors from "cors";
import router from "./routes";
import cookieParser from "cookie-parser";
import { initializePassport } from "./middleware/passport";

export const createServer = () => {
    const app = express();
    app
        .disable("x-powered-by")
        .use(morgan("dev"))
        .use(express.urlencoded({ extended: true }))
        .use(cookieParser())
        .use(express.json())
        .use(cors({
            origin: process.env.FRONTEND_URL,
            credentials: true,
        }))
        .use(initializePassport())

    app.get("/healthz", (req, res) => {
        return res.json({ ok: true, environment: process.env.NODE_ENV });
    });

    app.use("/api/", router);


    return app;
};
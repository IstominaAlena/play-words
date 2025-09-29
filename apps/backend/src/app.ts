import cors from "cors";
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import userRoutes from "@/api/routes/users";

import { i18nMiddleware } from "./config/i18n/middleware";
import { errorHandler } from "./middlewares/error-handler";
import { notFoundHandler } from "./middlewares/not-found-handler";

const app: Application = express();

// Handles application/json parse req.body into js object
app.use(express.json());
// Handles application/x-www-form-urlencoded (HTML forms) and converts into req.body
app.use(express.urlencoded({ extended: true }));
// Set of middlewares to protect HTTP-headers
app.use(helmet());
// Adds CORS (Access-Control-Allow-Origin) headers to protect api connection
app.use(cors());
//  HTTP-requests logger to console
app.use(morgan("dev"));
// Implement localizations for error messages
app.use(i18nMiddleware);

app.use("/api/users", userRoutes);

app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
});

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

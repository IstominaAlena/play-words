import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import passportStrategy from "passport-strategies/user-passport-strategies";

import dictionaryRoutes from "@/api/routes/dictionary";
import practiceRoutes from "@/api/routes/practice";
import userRoutes from "@/api/routes/users";
import "@/crons/hard-delete-user-by-request";
import { errorHandler } from "@/middlewares/error-handler";
import { healthCheck } from "@/middlewares/health-check";
import { notFoundHandler } from "@/middlewares/not-found-handler";

const app: Application = express();

// Handles application/json parse req.body into js object
app.use(express.json());
// Handles application/x-www-form-urlencoded (HTML forms) and converts into req.body
app.use(express.urlencoded({ extended: true }));
// Set of middlewares to protect HTTP-headers
app.use(helmet());
// Adds CORS (Access-Control-Allow-Origin) headers to protect api connection
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true, // to pass cookies
        allowedHeaders: ["Content-Type", "Authorization"],
    }),
);
//  HTTP-requests logger to console
app.use(morgan("dev"));
// Parse cookies from requests
app.use(cookieParser());

app.use(passportStrategy.initialize());

app.use("/api/users", userRoutes);
app.use("/api/dictionary", dictionaryRoutes);
app.use("/api/practice", practiceRoutes);

app.get("/api/health", healthCheck);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

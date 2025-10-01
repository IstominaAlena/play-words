import { Request, Response } from "express";

import { AppError } from "@/types/common";

export const errorHandler = (err: AppError, req: Request, res: Response) => {
    const messages = req.messages;

    const message = err.message || messages.INTERNAL_SERVER_ERROR || "Internal Server Error";

    res.status(err.statusCode || 500).json({ message });
};

import { Request, Response } from "express";

import { AppError } from "@/types/common";

export const notFoundHandler = (_err: AppError, req: Request, res: Response) => {
    const messages = req.messages;

    const message = messages.NOT_FOUND || "Not found";

    res.status(404).json({ message });
};

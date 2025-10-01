import { Request, Response } from "express";

import { usersService } from "@/db/services/users-service";

export const getUserById = async (req: Request, res: Response) => {
    const messages = req.messages;

    const userId = Number(req.params.id);

    if (!userId) {
        const message = messages.USER_ID_REQUIRED || "User ID is required";
        return res.status(400).json({ message });
    }

    const users = await usersService.getUserById(userId);

    if (users.length === 0) {
        const message = messages.USER_NOT_FOUND || "User not found";
        return res.status(404).json({ message });
    }

    res.json(users[0]);
};

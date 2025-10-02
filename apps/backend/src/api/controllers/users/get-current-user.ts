import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { usersService } from "@/db/services/users-service";
import { AppRequest } from "@/types/common";

export const getCurrentUser = async (req: AppRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw { statusCode: 404, messageKey: messageKeys.UNAUTHORIZED };
    }

    const safeUser = await usersService.getSafeUserById(userId);

    if (!safeUser) {
        throw { statusCode: 404, messageKey: messageKeys.NOT_FOUND };
    }

    res.json({ user: safeUser });
};

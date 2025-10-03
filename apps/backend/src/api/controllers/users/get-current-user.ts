import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { usersService } from "@/db/services/users-service";
import { AppError } from "@/services/error-service";
import { AppRequest } from "@/types/common";

export const getCurrentUser = async (req: AppRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const safeUser = await usersService.getSafeUserById(userId);

    if (!safeUser) {
        throw new AppError(404, messageKeys.NOT_FOUND);
    }

    res.json({ user: safeUser });
};

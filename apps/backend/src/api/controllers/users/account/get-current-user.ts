import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { userSettingsService } from "@/db/services/users/user-settings-service";
import { usersService } from "@/db/services/users/users-service";
import { AppError } from "@/services/error-service";
import { AuthenticatedRequest } from "@/types/common";

export const getCurrentUser = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const [safeUser, settings] = await Promise.all([
        usersService.getSafeUser(userId),
        userSettingsService.getSettingsByUserId(userId),
    ]);

    if (!safeUser || !settings) {
        throw new AppError(404, messageKeys.NOT_FOUND);
    }

    res.json({ user: safeUser, settings });
};

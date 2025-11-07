import { Response } from "express";

import { UpdateAccountSettingsDto } from "@repo/common/types/account";

import { messageKeys } from "@/constants/common";
import { userSettingsService } from "@/db/services/users/user-settings-service";
import { AppError } from "@/services/error-service";
import { AuthenticatedRequest } from "@/types/common";

export const updateSettings = async (
    req: AuthenticatedRequest<UpdateAccountSettingsDto>,
    res: Response,
) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const { theme, wordsPerTraining } = req.body;

    if (!theme || !wordsPerTraining) {
        throw new AppError(400, messageKeys.BAD_REQUEST);
    }

    const updateDto: UpdateAccountSettingsDto = {};

    if (theme) {
        updateDto.theme = theme;
    }

    if (wordsPerTraining) {
        updateDto.wordsPerTraining = wordsPerTraining;
    }

    const settingsId = await userSettingsService.updateUserSettings(userId, updateDto);

    if (!settingsId) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    res.status(204).end();
};

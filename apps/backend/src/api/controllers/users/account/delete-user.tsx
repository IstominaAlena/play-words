import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { usersService } from "@/db/services/users/users-service";
import { AppError } from "@/services/error-service";
import { AuthenticatedRequest } from "@/types/common";

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const dbUserId = await usersService.deleteUser(userId);

    if (!dbUserId) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    res.status(204).end();
};

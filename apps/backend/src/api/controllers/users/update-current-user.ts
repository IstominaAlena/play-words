import { Response } from "express";

import { UpdateUserDto } from "@repo/common/types/users";

import { messageKeys } from "@/constants/common";
import { usersService } from "@/db/services/users/users-service";
import { AppError } from "@/services/error-service";
import { AuthenticatedRequest } from "@/types/common";

export const updateCurrentUser = async (
    req: AuthenticatedRequest<UpdateUserDto>,
    res: Response,
) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const currentUser = await usersService.getSafeUser(userId);

    if (!currentUser) {
        throw new AppError(404, messageKeys.NOT_FOUND);
    }

    const { username: rawUsername } = req.body;

    const updateData: UpdateUserDto = {};

    if (rawUsername) updateData.username = rawUsername.trim();

    if (Object.keys(updateData).length === 0) {
        throw new AppError(400, messageKeys.BAD_REQUEST);
    }

    const safeUser = await usersService.updateUser(currentUser.id, updateData);

    if (!safeUser) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    res.json({ user: safeUser });
};

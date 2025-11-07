import { Response } from "express";

import { UpdateAccountDto } from "@repo/common/types/account";

import { messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-service";
import { userSettingsService } from "@/db/services/users/user-settings-service";
import { usersService } from "@/db/services/users/users-service";
import { AppError } from "@/services/error-service";
import { AuthenticatedRequest } from "@/types/common";

export const updateCurrentUser = async (
    req: AuthenticatedRequest<UpdateAccountDto>,
    res: Response,
) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const [currentUser, credentials] = await Promise.all([
        usersService.getSafeUser(userId),
        userCredentialsService.getCredentialsByUserId(userId),
    ]);

    if (!currentUser || !credentials) {
        throw new AppError(404, messageKeys.NOT_FOUND);
    }

    const { username: rawUsername, email: rawEmail } = req.body;

    const updateData: UpdateAccountDto = {};

    if (rawUsername) {
        updateData.username = rawUsername.trim();
    }

    if (rawEmail) {
        const newEmail = rawEmail.trim().toLowerCase();

        if (newEmail !== currentUser.email) {
            const userWithNewEmailExists = await usersService.getUserByEmail(newEmail);

            if (userWithNewEmailExists && userWithNewEmailExists.id !== currentUser.id) {
                throw new AppError(400, messageKeys.ALREADY_EXISTS);
            }

            if (!credentials.passwordHash) {
                throw new AppError(400, messageKeys.CREATE_PASSWORD_TO_CHANGE_EMAIL);
            }

            updateData.email = newEmail;
        }
    }

    if (Object.keys(updateData).length === 0) {
        throw new AppError(400, messageKeys.BAD_REQUEST);
    }

    const safeUser = await usersService.updateUser(currentUser.id, updateData);

    if (!safeUser) {
        throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
    }

    if (credentials.googleProviderId) {
        const [credentialsId, settings] = await Promise.all([
            userCredentialsService.updateUserCredentials(credentials.id, {
                googleProviderId: null,
            }),
            userSettingsService.updateUserSettings(credentials.userId, {
                google: false,
            }),
        ]);

        if (!credentialsId || !settings) {
            throw new AppError(500, messageKeys.SOMETHING_WENT_WRONG);
        }
    }

    res.status(204).end();
};

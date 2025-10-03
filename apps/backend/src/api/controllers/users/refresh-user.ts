import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { userTokensService } from "@/db/services/user-tokens-service";
import { usersService } from "@/db/services/users-service";
import { tokenService } from "@/services/token-service";
import { AppRequest } from "@/types/common";

export const refreshUser = async (req: AppRequest, res: Response) => {
    const rawCookiesRefreshToken = req.cookies.refresh_token;

    const tokenRecord = await userTokensService.validateRefreshToken(rawCookiesRefreshToken);

    if (!tokenRecord) {
        throw { statusCode: 404, messageKey: messageKeys.INVALID_TOKEN };
    }

    const safeUser = await usersService.getSafeUserById(tokenRecord.userId);

    if (!safeUser) {
        throw { statusCode: 404, messageKey: messageKeys.NOT_FOUND };
    }

    const accessToken = tokenService.generateAccessToken(safeUser.id, safeUser.email);

    const { token, tokenHash } = tokenService.generateTokenPair();

    await userTokensService.createUserRefreshToken({
        userId: safeUser.id,
        tokenHash,
    });

    tokenService.setRefreshTokenCookie(res, token);

    res.json({ user: safeUser, accessToken });
};

import { Response } from "express";

import { messageKeys } from "@/constants/common";
import { userCredentialsService } from "@/db/services/users/user-credentials-service";
import { AppError } from "@/services/error-service";
import { otpService } from "@/services/otp-service";
import { AuthenticatedRequest } from "@/types/common";

export const getOtpSettings = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.id;
    const email = req.user.email;

    if (!userId || !email) {
        throw new AppError(401, messageKeys.UNAUTHORIZED);
    }

    const credentials = await userCredentialsService.getCredentialsByUserId(userId);

    if (!credentials) {
        throw new AppError(404, messageKeys.CREDENTIALS_NOT_FOUND);
    }

    const secret = credentials.otpSecret;

    if (!secret) {
        throw new AppError(400, messageKeys.OTP_NOT_ENABLED);
    }

    const otpAuthUrl = otpService.generateOtpAuthUrl(email, secret);

    return res.status(200).json({ otpAuthUrl, secret });
};

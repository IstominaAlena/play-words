import { z } from "zod";

import { EMAIL_REGEX, MIN_OTP_LENGTH, MIN_PASSWORD_LENGTH } from "../constants/regex";

export const validationFields = {
    email: z.string().min(1, "REQUIRED").regex(EMAIL_REGEX, "INVALID_EMAIL"),
    username: z.string().min(1, "REQUIRED"),
    password: z.string().min(MIN_PASSWORD_LENGTH, "SHORT_PASSWORD"),
    code: z.string().length(MIN_OTP_LENGTH, "INVALID_OTP"),
};

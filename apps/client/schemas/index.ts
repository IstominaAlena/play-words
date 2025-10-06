import { z } from "zod";

import { MIN_PASSWORD_LENGTH } from "@repo/common/constants/regex";
import { createUserSchema } from "@repo/common/schemas/users";

export const signUpUserSchema = z
    .object({
        ...createUserSchema.shape,
        confirmPassword: z.string().min(MIN_PASSWORD_LENGTH, "PASSWORD_MATCH"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "PASSWORD_MATCH",
    });

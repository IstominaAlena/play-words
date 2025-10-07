import { z } from "zod";

import { MIN_PASSWORD_LENGTH } from "@repo/common/constants/regex";
import { createUserSchema } from "@repo/common/schemas/users";
import { validationFields } from "@repo/common/schemas/validation-fields";

export const signUpUserSchema = z
    .object({
        ...createUserSchema.shape,
        confirmPassword: z.string().min(MIN_PASSWORD_LENGTH, "PASSWORD_MATCH"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "PASSWORD_MATCH",
    });

export const resetUserPasswordDtoSchema = z
    .object({
        password: validationFields.password,
        confirmPassword: z.string().min(MIN_PASSWORD_LENGTH, "PASSWORD_MATCH"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "PASSWORD_MATCH",
    });

export const editCurrentUserSchema = z.object({
    username: validationFields.username,
    email: validationFields.email,
});

// TODO: Get it from the backend side
export const changePasswordSchema = z
    .object({
        oldPassword: validationFields.password,
        newPassword: validationFields.password,
        confirmPassword: z.string().min(MIN_PASSWORD_LENGTH, "PASSWORD_MATCH"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "PASSWORD_MATCH",
    });

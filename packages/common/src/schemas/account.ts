import { z } from "zod";

import { MIN_PASSWORD_LENGTH } from "../constants/regex";
import { validationFields } from "./validation-fields";

export const createAccountSchema = z.object({
    email: validationFields.email,
    username: validationFields.username,
    password: validationFields.password,
});

export const loginSchema = z.object({
    email: validationFields.email,
    password: validationFields.password,
});

export const verifyOtpSchema = z.object({
    email: validationFields.email,
    code: validationFields.code,
});

export const updateAccountSchema = z.object({
    email: validationFields.email.optional(),
    username: validationFields.username.optional(),
});

export const resetPasswordRequestSchema = z.object({
    email: validationFields.email,
});

export const resetPasswordSchema = z.object({
    password: validationFields.password,
});

export const changePasswordSchema = z.object({
    password: validationFields.password,
});

export const signUpDtoSchema = z
    .object({
        ...createAccountSchema.shape,
        confirmPassword: z.string().min(MIN_PASSWORD_LENGTH, "PASSWORD_MATCH"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "PASSWORD_MATCH",
    });

export const changePasswordDtoSchema = z
    .object({
        ...changePasswordSchema.shape,
        confirmPassword: z.string().min(MIN_PASSWORD_LENGTH, "PASSWORD_MATCH"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "PASSWORD_MATCH",
    });

export const updateAccountSettingsSchema = z.object({
    theme: z.string().min(1, "REQUIRED").optional(),
    wordsPerTraining: z.number().min(1, "REQUIRED").optional(),
});

import { z } from "zod";

import { validationFields } from "./validation-fields";

export const createUserSchema = z.object({
    email: validationFields.email,
    username: validationFields.username,
    password: validationFields.password,
});

export const loginUserSchema = z.object({
    email: validationFields.email,
    password: validationFields.password,
});

export const updateUserSchema = z.object({
    // email: validationFields.email.optional(),
    username: validationFields.username.optional(),
});

export const resetUserPasswordRequestSchema = z.object({
    email: validationFields.email,
});

export const resetUserPasswordSchema = z.object({
    token: z.string().min(1, "REQUIRED"),
    password: validationFields.password,
});

export const changePasswordSchema = z.object({
    password: validationFields.password,
});

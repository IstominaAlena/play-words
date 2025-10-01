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

import z from "zod";

import {
    createUserSchema,
    loginUserSchema,
    resetUserPasswordRequestSchema,
    resetUserPasswordSchema,
    updateUserSchema,
} from "../schemas/users";

export interface ErrorResponse {
    message?: string;
}

export interface User {
    id: number;
    email: string;
    username: string;
}

export interface UserResponse {
    user: User;
    accessToken: string;
}

export type CreateUserDto = z.infer<typeof createUserSchema>;

export type UpdateUserDto = z.infer<typeof updateUserSchema>;

export type LoginUserDto = z.infer<typeof loginUserSchema>;

export type ResetUserPasswordRequest = z.infer<typeof resetUserPasswordRequestSchema>;

export type ResetUserPassword = z.infer<typeof resetUserPasswordSchema>;

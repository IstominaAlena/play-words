import z from "zod";

import {
    changePasswordDtoSchema,
    changePasswordSchema,
    createAccountSchema,
    loginSchema,
    resetPasswordRequestSchema,
    resetPasswordSchema,
    signUpDtoSchema,
    updateAccountSchema,
} from "../schemas/account";

export interface ErrorResponse {
    message?: string;
}

export interface Account {
    id: number;
    email: string;
    username: string;
    deletionDate: string | null;
}

export interface Settings {
    password: boolean;
    google: boolean;
    otp: boolean;
    verified: boolean;
}

export interface AccountResponse {
    user: Account;
    settings: Settings;
}

export interface LoginResponse {
    otp: boolean;
    email?: string;
}

export interface OtpResponse {
    otpAuthUrl: string;
    secret: string;
}

export interface VerifyOtpDto {
    code: string;
    email: string;
}

export type CreateAccountDto = z.infer<typeof createAccountSchema>;

export type UpdateAccountDto = z.infer<typeof updateAccountSchema>;

export type LoginDto = z.infer<typeof loginSchema>;

export type SignUpDto = z.infer<typeof signUpDtoSchema>;

export type ResetPasswordRequest = z.infer<typeof resetPasswordRequestSchema>;

export type ResetPasswordDto = z.infer<typeof resetPasswordSchema>;

export type ChangePassword = z.infer<typeof changePasswordSchema>;

export type ChangePasswordDto = z.infer<typeof changePasswordDtoSchema>;

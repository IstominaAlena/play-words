import { api } from "@repo/api-config/api-config";
import {
    CreateAccountDto,
    LoginDto,
    LoginResponse,
    ResetPasswordDto,
    ResetPasswordRequest,
    VerifyOtpDto,
} from "@repo/common/types/account";

export const signUp = async (dto: CreateAccountDto): Promise<void> => {
    await api.post("/users/sign-up", dto);
};

export const signIn = async (dto: LoginDto): Promise<LoginResponse> => {
    const { data } = await api.post<LoginResponse>("/users/sign-in", dto);
    return data;
};

export const verifyOtp = async (dto: VerifyOtpDto): Promise<void> => {
    await api.post("/users/verify-otp", dto);
};

export const logout = async () => {
    await api.post("/users/logout");
};

export const refresh = async (): Promise<void> => {
    await api.post("/users/refresh");
};

export const resetPasswordRequest = async (dto: ResetPasswordRequest): Promise<boolean> => {
    const { data } = await api.post<{ success: boolean }>("/users/reset-password-request", dto);

    return data.success;
};

export const resetPassword = async (dto: ResetPasswordDto): Promise<void> => {
    await api.post("/users/reset-password", dto);
};

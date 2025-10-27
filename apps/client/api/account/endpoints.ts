import { api } from "@repo/api-config/api-config";
import {
    AccountResponse,
    OtpResponse,
    ResetPasswordDto,
    UpdateAccountDto,
} from "@repo/common/types/account";

export const getCurrentUser = async (): Promise<AccountResponse> => {
    const { data } = await api.get<AccountResponse>("/users/me");

    return data;
};

export const updateCurrentUser = async (dto: UpdateAccountDto): Promise<void> => {
    await api.patch("/users/me", dto);
};

export const disconnectGoogleAccount = async (): Promise<void> => {
    await api.patch("/users/google/disconnect");
};

export const changePassword = async (dto: ResetPasswordDto): Promise<void> => {
    await api.patch("/users/change-password", dto);
};

export const enableOtp = async (): Promise<OtpResponse> => {
    const { data } = await api.patch<OtpResponse>("/users/otp/enable");

    return data;
};

export const disableOtp = async (): Promise<void> => {
    await api.patch("/users/otp/disable");
};

export const getOtpSettings = async (): Promise<OtpResponse> => {
    const { data } = await api.get<OtpResponse>("/users/otp");

    return data;
};

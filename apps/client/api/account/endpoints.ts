import { api } from "@repo/api-config/api-config";
import { EnableOtpResponse, UserPasswordDto, UserResponse } from "@repo/common/types/users";

export const getCurrentUser = async (): Promise<UserResponse> => {
    const { data } = await api.get<UserResponse>("/users/me");

    return data;
};

export const disconnectGoogleAccount = async (): Promise<void> => {
    await api.patch("/users/google/disconnect");
};

export const changePassword = async (dto: UserPasswordDto): Promise<void> => {
    await api.patch("/users/change-password", dto);
};

export const enableOtp = async (): Promise<EnableOtpResponse> => {
    const { data } = await api.patch<EnableOtpResponse>("users/otp/enable");

    return data;
};

export const disableOtp = async (): Promise<void> => {
    await api.patch("users/otp/disable");
};

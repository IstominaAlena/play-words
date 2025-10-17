import { api } from "@repo/api-config/api-config";
import { Settings, UserPasswordDto, UserResponse } from "@repo/common/types/users";

export const getCurrentUser = async (): Promise<UserResponse> => {
    const { data } = await api.get<UserResponse>("/users/me");

    return data;
};

export const disconnectGoogleAccount = async (): Promise<Settings> => {
    const { data } = await api.post<{ settings: Settings }>("/users/google/disconnect");

    return data.settings;
};

export const changePassword = async (dto: UserPasswordDto): Promise<void> => {
    await api.patch("/users/change-password", dto);
};

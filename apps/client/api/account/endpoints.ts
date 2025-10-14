import { api } from "@repo/api-config/api-config";
import { Settings, UserResponse } from "@repo/common/types/users";

export const getCurrentUser = async (): Promise<UserResponse> => {
    const { data } = await api.get<UserResponse>("/users/me");

    return data;
};

export const disconnectGoogleAccount = async (): Promise<Settings> => {
    const { data } = await api.post<{ settings: Settings }>("/users/google/disconnect");

    return data.settings;
};

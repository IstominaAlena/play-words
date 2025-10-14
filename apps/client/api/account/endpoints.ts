import { api } from "@repo/api-config/api-config";
import { UserResponse } from "@repo/common/types/users";

export const getCurrentUser = async (): Promise<UserResponse> => {
    const { data } = await api.get<UserResponse>("/users/me");

    return data;
};

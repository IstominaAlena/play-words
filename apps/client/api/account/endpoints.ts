import { api } from "@repo/api-config/api-config";
import { User } from "@repo/common/types/users";

export const getCurrentUser = async (): Promise<User> => {
    const { data } = await api.get<{ user: User }>("/users/me");

    return data.user;
};

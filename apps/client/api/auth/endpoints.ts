import { api } from "@repo/api-config/api-config";
import { CreateUserDto, UserResponse } from "@repo/common/types/users";

export const signUp = async (dto: CreateUserDto): Promise<UserResponse> => {
    const { data } = await api.post<UserResponse>("/users/sign-up", dto);

    return data;
};

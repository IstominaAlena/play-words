import { api } from "@repo/api-config/api-config";
import { CreateUserDto, LoginUserDto, UserResponse } from "@repo/common/types/users";

export const signUp = async (dto: CreateUserDto): Promise<UserResponse> => {
    const { data } = await api.post<UserResponse>("/users/sign-up", dto);

    return data;
};

export const signIn = async (dto: LoginUserDto): Promise<UserResponse> => {
    const { data } = await api.post<UserResponse>("/users/sign-in", dto);

    return data;
};

export const logout = async () => {
    await api.post<UserResponse>("/users/logout");
};

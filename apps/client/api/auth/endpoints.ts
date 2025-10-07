import { api } from "@repo/api-config/api-config";
import { CreateUserDto, LoginUserDto } from "@repo/common/types/users";

export const signUp = async (dto: CreateUserDto): Promise<string> => {
    const { data } = await api.post<{ accessToken: string }>("/users/sign-up", dto);

    return data.accessToken;
};

export const signIn = async (dto: LoginUserDto): Promise<string> => {
    const { data } = await api.post<{ accessToken: string }>("/users/sign-in", dto);

    return data.accessToken;
};

export const logout = async () => {
    await api.post("/users/logout");
};

export const refresh = async (): Promise<string> => {
    const { data } = await api.post<{ accessToken: string }>("/users/refresh");

    return data.accessToken;
};

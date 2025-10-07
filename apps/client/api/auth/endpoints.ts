import { api } from "@repo/api-config/api-config";
import {
    CreateUserDto,
    LoginUserDto,
    ResetUserPassword,
    ResetUserPasswordRequest,
} from "@repo/common/types/users";

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

export const resetPasswordRequest = async (dto: ResetUserPasswordRequest): Promise<string> => {
    const { data } = await api.post<{ redirectUrl: string }>("/users/reset-password-request", dto);

    return data.redirectUrl;
};

export const resetPassword = async (dto: ResetUserPassword): Promise<boolean> => {
    const { data } = await api.post<{ success: boolean }>("/users/reset-password", dto);

    return data.success;
};

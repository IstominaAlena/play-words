import { api } from "@repo/api-config/api-config";
import {
    CreateUserDto,
    LoginUserDto,
    ResetUserPasswordRequest,
    UserPasswordDto,
} from "@repo/common/types/users";

export const signUp = async (dto: CreateUserDto): Promise<void> => {
    await api.post("/users/sign-up", dto);
};

export const signIn = async (dto: LoginUserDto): Promise<void> => {
    await api.post("/users/sign-in", dto);
};

export const logout = async () => {
    await api.post("/users/logout");
};

export const refresh = async (): Promise<void> => {
    await api.post("/users/refresh");
};

export const resetPasswordRequest = async (dto: ResetUserPasswordRequest): Promise<string> => {
    const { data } = await api.post<{ redirectUrl: string }>("/users/reset-password-request", dto);

    return data.redirectUrl;
};

export const resetPassword = async (dto: UserPasswordDto): Promise<void> => {
    await api.post("/users/reset-password", dto);
};

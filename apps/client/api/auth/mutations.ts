"use client";

import { useTranslations } from "next-intl";

import { useApiMutation } from "@repo/api-config/api-config";
import { useUserStore } from "@repo/common/stores/user-store";
import { CreateUserDto, LoginUserDto, UserResponse } from "@repo/common/types/users";

import { logout, signIn, signUp } from "./endpoints";

export const useSignUp = () => {
    const t = useTranslations("global");

    const { saveUser, saveToken } = useUserStore();

    return useApiMutation<UserResponse, CreateUserDto>({
        retry: false,
        mutationFn: signUp,
        mutationKey: ["sign-up"],
        onSuccess: (data) => {
            if (!data || !data.user || !data.accessToken) {
                throw new Error(`${t("something_wrong")}: ${data}`);
            }

            saveUser(data.user);
            saveToken(data.accessToken);
        },
    });
};

export const useSignIn = () => {
    const t = useTranslations("global");

    const { saveUser, saveToken } = useUserStore();

    return useApiMutation<UserResponse, LoginUserDto>({
        retry: false,
        mutationFn: signIn,
        mutationKey: ["sign-in"],
        onSuccess: (data) => {
            if (!data || !data.user || !data.accessToken) {
                throw new Error(`${t("something_wrong")}: ${data}`);
            }

            saveUser(data.user);
            saveToken(data.accessToken);
        },
    });
};

export const useLogout = () => {
    const { clearUser, clearToken } = useUserStore();

    return useApiMutation<void, void>({
        retry: false,
        mutationFn: logout,
        mutationKey: ["logout"],
        onSuccess: () => {
            clearUser();
            clearToken();
        },
    });
};

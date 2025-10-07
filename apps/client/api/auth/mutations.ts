"use client";

import { useTranslations } from "next-intl";

import { useApiMutation } from "@repo/api-config/api-config";
import { useUserStore } from "@repo/common/stores/user-store";
import {
    CreateUserDto,
    LoginUserDto,
    ResetUserPassword,
    ResetUserPasswordRequest,
} from "@repo/common/types/users";
import { useRouter } from "@repo/i18n/config/navigation";

import { Routes } from "@/enums/routes";

import { useGetCurrentUser } from "../account/mutations";
import { logout, resetPassword, resetPasswordRequest, signIn, signUp } from "./endpoints";

export const useSignUp = () => {
    const t = useTranslations("global");

    const { saveToken } = useUserStore();

    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    return useApiMutation<string, CreateUserDto>({
        retry: false,
        mutationFn: signUp,
        mutationKey: ["sign-up"],
        onSuccess: async (data) => {
            if (!data) {
                throw new Error(t("something_wrong"));
            }

            saveToken(data);

            await getCurrentUser();
        },
    });
};

export const useSignIn = () => {
    const t = useTranslations("global");

    const { saveToken } = useUserStore();

    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    return useApiMutation<string, LoginUserDto>({
        retry: false,
        mutationFn: signIn,
        mutationKey: ["sign-in"],
        onSuccess: async (data) => {
            if (!data) {
                throw new Error(t("something_wrong"));
            }

            saveToken(data);

            await getCurrentUser();
        },
    });
};

export const useLogout = () => {
    const router = useRouter();

    const { clearUser, clearToken } = useUserStore();

    return useApiMutation<void, void>({
        retry: false,
        mutationFn: logout,
        mutationKey: ["logout"],
        onSuccess: () => {
            clearUser();
            clearToken();
            router.replace(Routes.HOME);
        },
    });
};

export const useResetPasswordRequest = () => {
    const router = useRouter();

    const t = useTranslations("global");

    return useApiMutation<string, ResetUserPasswordRequest>({
        retry: false,
        mutationFn: resetPasswordRequest,
        mutationKey: ["reset-password-request"],
        onSuccess: (data) => {
            if (!data) {
                throw new Error(t("something_wrong"));
            }

            router.push(data);
        },
    });
};

export const useResetPassword = () => {
    const router = useRouter();

    const t = useTranslations("global");

    return useApiMutation<boolean, ResetUserPassword>({
        retry: false,
        mutationFn: resetPassword,
        mutationKey: ["reset-password"],
        onSuccess: (data) => {
            if (!data) {
                throw new Error(t("something_wrong"));
            }

            router.push(Routes.HOME);
        },
    });
};

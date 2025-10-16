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
import { useAuthHandlers } from "@/hooks/use-auth-handlers";

import { useGetCurrentUser } from "../account/mutations";
import {
    changePassword,
    logout,
    resetPassword,
    resetPasswordRequest,
    signIn,
    signUp,
} from "./endpoints";

export const useSignUp = () => {
    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    return useApiMutation<void, CreateUserDto>({
        retry: false,
        mutationFn: signUp,
        mutationKey: ["sign-up"],
        onSuccess: async () => {
            await getCurrentUser();
        },
    });
};

export const useSignIn = () => {
    const t = useTranslations("global");

    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    return useApiMutation<void, LoginUserDto>({
        retry: false,
        mutationFn: signIn,
        mutationKey: ["sign-in"],
        onSuccess: async () => {
            await getCurrentUser();
        },
    });
};

export const useLogout = () => {
    const { handleLogout } = useAuthHandlers();

    return useApiMutation<void, void>({
        retry: false,
        mutationFn: logout,
        mutationKey: ["logout"],
        onSuccess: handleLogout,
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

    return useApiMutation<void, ResetUserPassword>({
        retry: false,
        mutationFn: resetPassword,
        mutationKey: ["reset-password"],
        onSuccess: () => router.push(Routes.HOME),
    });
};

export const useChangePassword = () => {
    return useApiMutation<void, ResetUserPassword>({
        retry: false,
        mutationFn: changePassword,
        mutationKey: ["change-password"],
    });
};

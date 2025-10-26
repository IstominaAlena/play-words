"use client";

import { useTranslations } from "next-intl";

import { useApiMutation } from "@repo/api-config/api-config";
import {
    CreateAccountDto,
    LoginDto,
    LoginResponse,
    ResetPasswordDto,
    ResetPasswordRequest,
    VerifyOtpDto,
} from "@repo/common/types/account";
import { useRouter } from "@repo/i18n/config/navigation";

import { Routes, SecondaryRoutes } from "@/enums/routes";
import { useAuthHandlers } from "@/hooks/use-auth-handlers";

import { useGetCurrentUser } from "../account/mutations";
import {
    logout,
    resetPassword,
    resetPasswordRequest,
    signIn,
    signUp,
    verifyOtp,
} from "./endpoints";

export const useSignUp = () => {
    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    return useApiMutation<void, CreateAccountDto>({
        retry: false,
        mutationFn: signUp,
        mutationKey: ["sign-up"],
        onSuccess: async () => {
            await getCurrentUser();
        },
    });
};

export const useSignIn = () => {
    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    return useApiMutation<LoginResponse, LoginDto>({
        retry: false,
        mutationFn: signIn,
        mutationKey: ["sign-in"],
        onSuccess: async (data) => {
            if (!data?.otp) {
                await getCurrentUser();
            }
        },
    });
};

export const useVerifyOtp = () => {
    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    return useApiMutation<void, VerifyOtpDto>({
        retry: false,
        mutationFn: verifyOtp,
        mutationKey: ["verify-otp"],
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

    return useApiMutation<boolean, ResetPasswordRequest>({
        retry: false,
        mutationFn: resetPasswordRequest,
        mutationKey: ["reset-password-request"],
        onSuccess: (data) => {
            if (!data) {
                throw new Error(t("something_wrong"));
            }

            router.push(SecondaryRoutes.RESET_PASSWORD);
        },
    });
};

export const useResetPassword = () => {
    const router = useRouter();

    return useApiMutation<void, ResetPasswordDto>({
        retry: false,
        mutationFn: resetPassword,
        mutationKey: ["reset-password"],
        onSuccess: () => router.push(Routes.HOME),
    });
};

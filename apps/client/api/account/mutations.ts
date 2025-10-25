"use client";

import { useTranslations } from "next-intl";

import { useApiMutation } from "@repo/api-config/api-config";
import { useUserStore } from "@repo/common/stores/user-store";
import {
    EnableOtpResponse,
    Settings,
    UserPasswordDto,
    UserResponse,
} from "@repo/common/types/users";

import {
    changePassword,
    disableOtp,
    disconnectGoogleAccount,
    enableOtp,
    getCurrentUser,
} from "./endpoints";

export const useGetCurrentUser = () => {
    const t = useTranslations("global");

    const { saveUser, saveSettings } = useUserStore();

    return useApiMutation<UserResponse, void>({
        retry: false,
        mutationFn: getCurrentUser,
        mutationKey: ["current-user"],
        onSuccess: (data) => {
            if (!data) {
                throw new Error(t("something_wrong"));
            }
            saveUser(data.user);
            saveSettings(data.settings);
        },
    });
};

export const useDisconnectGoogleAccount = () => {
    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    return useApiMutation<void, void>({
        retry: false,
        mutationFn: disconnectGoogleAccount,
        mutationKey: ["disconnect-google-account"],
        onSuccess: async () => {
            await getCurrentUser();
        },
    });
};

export const useChangePassword = () => {
    return useApiMutation<void, UserPasswordDto>({
        retry: false,
        mutationFn: changePassword,
        mutationKey: ["change-password"],
    });
};

export const useToggleOtp = () => {
    const t = useTranslations("global");

    const { saveSettings } = useUserStore();

    const handleSuccess = (settings?: Settings) => {
        if (!settings) {
            throw new Error(t("something_wrong"));
        }
        saveSettings(settings);
    };

    const enable = useApiMutation<EnableOtpResponse, void>({
        retry: false,
        mutationFn: enableOtp,
        mutationKey: ["enable-otp"],
        onSuccess: (data) => handleSuccess(data?.settings),
    });

    const disable = useApiMutation<Settings, void>({
        retry: false,
        mutationFn: disableOtp,
        mutationKey: ["disable-otp"],
        onSuccess: (data) => handleSuccess(data),
    });

    return { enable, disable };
};

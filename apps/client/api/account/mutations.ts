"use client";

import { useTranslations } from "next-intl";

import { useApiMutation } from "@repo/api-config/api-config";
import { useUserStore } from "@repo/common/stores/user-store";
import {
    AccountResponse,
    OtpResponse,
    ResetPasswordDto,
    UpdateAccountDto,
} from "@repo/common/types/account";

import {
    changePassword,
    deleteCurrentUser,
    disableOtp,
    disconnectGoogleAccount,
    enableOtp,
    getCurrentUser,
    getOtpSettings,
    restoreCurrentUser,
    updateCurrentUser,
} from "./endpoints";

export const useGetCurrentUser = () => {
    const t = useTranslations("global");

    const { saveUser, saveSettings } = useUserStore();

    return useApiMutation<AccountResponse, void>({
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

export const useUpdateCurrentUser = () => {
    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    return useApiMutation<void, UpdateAccountDto>({
        retry: false,
        mutationFn: updateCurrentUser,
        mutationKey: ["update-user"],
        onSuccess: async () => {
            await getCurrentUser();
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
    return useApiMutation<void, ResetPasswordDto>({
        retry: false,
        mutationFn: changePassword,
        mutationKey: ["change-password"],
    });
};

export const useToggleOtp = () => {
    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    const enable = useApiMutation<OtpResponse, void>({
        retry: false,
        mutationFn: enableOtp,
        mutationKey: ["enable-otp"],
        onSuccess: async () => {
            await getCurrentUser();
        },
    });

    const disable = useApiMutation<void, void>({
        retry: false,
        mutationFn: disableOtp,
        mutationKey: ["disable-otp"],
        onSuccess: async () => {
            await getCurrentUser();
        },
    });

    return { enable, disable };
};

export const useGetOtpSettings = () => {
    return useApiMutation<OtpResponse, void>({
        retry: false,
        mutationFn: getOtpSettings,
        mutationKey: ["otp-settings"],
    });
};

export const useManageAccountState = () => {
    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    const deleteUser = useApiMutation<void, void>({
        retry: false,
        mutationFn: deleteCurrentUser,
        mutationKey: ["delete-current-user"],
        onSuccess: async () => {
            await getCurrentUser();
        },
    });

    const restoreUser = useApiMutation<void, void>({
        retry: false,
        mutationFn: restoreCurrentUser,
        mutationKey: ["restore-current-user"],
        onSuccess: async () => {
            await getCurrentUser();
        },
    });

    return { deleteUser, restoreUser };
};

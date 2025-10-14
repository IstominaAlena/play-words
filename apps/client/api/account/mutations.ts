"use client";

import { useTranslations } from "next-intl";

import { useApiMutation } from "@repo/api-config/api-config";
import { useUserStore } from "@repo/common/stores/user-store";
import { UserResponse } from "@repo/common/types/users";

import { getCurrentUser } from "./endpoints";

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

"use client";

import { useTranslations } from "next-intl";

import { useApiMutation } from "@repo/api-config/api-config";
import { useUserStore } from "@repo/common/stores/user-store";
import { CreateUserDto, UserResponse } from "@repo/common/types/users";

import { signUp } from "./endpoints";

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

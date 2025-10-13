"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { showToast } from "@repo/ui/core/sonner";

import { useUserStore } from "@repo/common/stores/user-store";
import { useRouter } from "@repo/i18n/config/navigation";

import { useGetCurrentUser } from "@/api/account/mutations";
import { Routes } from "@/enums/routes";

const AuthSuccessPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { saveToken } = useUserStore();
    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    useEffect(() => {
        const handleAuth = async () => {
            const token = searchParams.get("token");

            if (token) {
                saveToken(token);
            }

            try {
                await getCurrentUser();
            } catch (error: any) {
                showToast.error(error.message);
            } finally {
                router.push(Routes.HOME);
            }
        };

        handleAuth();
    }, [router, searchParams, saveToken, getCurrentUser]);

    return null;
};

export default AuthSuccessPage;

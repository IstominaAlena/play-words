"use client";

import { useEffect } from "react";

import { showToast } from "@repo/ui/core/sonner";

import { useRouter } from "@repo/i18n/config/navigation";

import { useGetCurrentUser } from "@/api/account/mutations";
import { Routes } from "@/enums/routes";

const AuthSuccessPage = () => {
    const router = useRouter();

    const { mutateAsync: getCurrentUser } = useGetCurrentUser();

    useEffect(() => {
        const handleAuth = async () => {
            try {
                await getCurrentUser();
            } catch (error: any) {
                showToast.error(error.message);
            } finally {
                router.push(Routes.HOME);
            }
        };

        handleAuth();
    }, [router, getCurrentUser]);

    return null;
};

export default AuthSuccessPage;

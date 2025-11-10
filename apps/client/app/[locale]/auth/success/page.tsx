"use client";

import { useEffect } from "react";

import { LoaderScreen } from "@repo/ui/components/loader-screen";
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
            } catch (error: unknown) {
                if (error instanceof Error) {
                    showToast.error(error.message);
                }
            } finally {
                const path = localStorage.getItem("path") ?? Routes.HOME;
                localStorage.removeItem("path");
                router.push(path);
            }
        };

        handleAuth();
    }, [router, getCurrentUser]);

    return <LoaderScreen />;
};

export default AuthSuccessPage;

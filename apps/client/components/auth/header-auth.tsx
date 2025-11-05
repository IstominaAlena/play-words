"use client";

import { useTranslations } from "next-intl";
import { FC, ReactNode, useEffect, useState } from "react";

import { AccountDropdown } from "@repo/ui/components/account-dropdown";
import { ConsentModal } from "@repo/ui/components/consent-modal";
import { Skeleton } from "@repo/ui/core/skeleton";
import { showToast } from "@repo/ui/core/sonner";

import { Account } from "@repo/common/types/account";

import { useLogout } from "@/api/auth/mutations";
import { SecondaryRoutes } from "@/enums/routes";

import { AuthBar } from "./auth-bar";

interface Props {
    user: Account | null;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
}

export const HeaderAuth: FC<Props> = ({ user, openModal, closeModal }) => {
    const t = useTranslations("auth");

    const [isMounted, setIsMounted] = useState(false);

    const { mutateAsync: logout, isPending } = useLogout();

    const onConfirmButtonClick = async () => {
        try {
            await logout();
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            closeModal();
        }
    };

    const onLogout = () =>
        openModal(
            <ConsentModal
                title={t("logout")}
                text={t("logout_subtitle")}
                onCancel={closeModal}
                onConfirm={onConfirmButtonClick}
                isLoading={isPending}
            />,
        );

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <Skeleton className="w-default! h-10 rounded-full" />;
    }

    return user ? (
        <AccountDropdown
            name={user.username}
            accountPath={SecondaryRoutes.ACCOUNT}
            onLogout={onLogout}
        />
    ) : (
        <AuthBar className="md:hidden" openModal={openModal} closeModal={closeModal} />
    );
};

"use client";

import { useTranslations } from "next-intl";
import { FC, ReactNode, useEffect, useState } from "react";

import { AccountDropdown } from "@repo/ui/components/account-dropdown";
import { ConsentModal } from "@repo/ui/components/consent-modal";
import { Skeleton } from "@repo/ui/core/skeleton";
import { showToast } from "@repo/ui/core/sonner";
import { AccountIcon } from "@repo/ui/icons/account";
import { SecurityIcon } from "@repo/ui/icons/security";
import { SettingsIcon } from "@repo/ui/icons/settings";
import { StatisticsIcon } from "@repo/ui/icons/statistics";

import { Account } from "@repo/common/types/account";

import { useLogout } from "@/api/auth/mutations";
import { AccountRoutes, SecondaryRoutes } from "@/enums/routes";

import { AuthBar } from "./auth-bar";

interface Props {
    user: Account | null;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
}

const links = [
    {
        text: "account",
        path: AccountRoutes.ACCOUNT,
        icon: AccountIcon,
    },
    {
        text: "security",
        path: AccountRoutes.SECURITY,
        icon: SecurityIcon,
    },
    {
        text: "settings",
        path: AccountRoutes.SETTINGS,
        icon: SettingsIcon,
    },
    {
        text: "statistics",
        path: AccountRoutes.STATISTICS,
        icon: StatisticsIcon,
    },
];

export const HeaderAuth: FC<Props> = ({ user, openModal, closeModal }) => {
    const t = useTranslations("auth");

    const [isMounted, setIsMounted] = useState(false);

    const { mutateAsync: logout, isPending } = useLogout();

    const onConfirmButtonClick = async () => {
        try {
            await logout();
        } catch (error: unknown) {
            if (error instanceof Error) {
                showToast.error(error.message);
            }
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
        return <Skeleton className="w-default! h-10 rounded-full md:hidden" />;
    }

    return user ? (
        <AccountDropdown name={user.username} links={links} onLogout={onLogout} />
    ) : (
        <AuthBar className="md:hidden" openModal={openModal} closeModal={closeModal} />
    );
};

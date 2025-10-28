"use client";

import { FC, ReactNode, useEffect, useState } from "react";

import { AccountDropdown } from "@repo/ui/components/account-dropdown";
import { Skeleton } from "@repo/ui/core/skeleton";

import { Account } from "@repo/common/types/account";

import { ProtectedRoutes } from "@/enums/routes";

import { AuthBar } from "./auth-bar";
import { LogoutModal } from "./logout-modal";

interface Props {
    user: Account | null;
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
}

export const HeaderAuth: FC<Props> = ({ user, openModal, closeModal }) => {
    const [isMounted, setIsMounted] = useState(false);

    const onLogout = () => openModal(<LogoutModal closeModal={closeModal} />);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <Skeleton className="w-default! h-10 rounded-full" />;
    }

    return user ? (
        <AccountDropdown
            name={user.username}
            accountPath={ProtectedRoutes.ACCOUNT}
            onLogout={onLogout}
        />
    ) : (
        <AuthBar className="md:hidden" openModal={openModal} closeModal={closeModal} />
    );
};

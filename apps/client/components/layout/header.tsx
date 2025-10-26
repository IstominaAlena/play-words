"use client";

import { FC } from "react";

import { MobileMenu } from "@repo/ui/components/mobile-menu";
import { NavBar } from "@repo/ui/components/nav-bar";
import { GradientLine } from "@repo/ui/core/gradient-line";
import { Logo } from "@repo/ui/core/logo";

import { useModal } from "@repo/common/hooks/use-modal.tsx";
import { useUserStore } from "@repo/common/stores/user-store";

import { navLinks } from "@/constants/index";
import { Routes } from "@/enums/routes";

import { AuthBar } from "../auth/auth-bar";
import { HeaderAuth } from "../auth/header-auth";

export const Header: FC = () => {
    const { Modal, openModal, closeModal } = useModal();

    const { user } = useUserStore();

    return (
        <>
            <header className="relative flex h-16 w-full items-center">
                <div className="container flex h-full items-center">
                    <div className="flex h-full flex-1 items-center lg:flex-2">
                        <Logo href={Routes.HOME} />
                    </div>
                    <div className="flex h-full flex-2 justify-center lg:hidden">
                        <NavBar links={navLinks} className="lg:hidden" />
                    </div>
                    <div className="flex h-full w-full flex-1 items-center justify-end gap-2">
                        <HeaderAuth user={user} openModal={openModal} closeModal={closeModal} />
                        <MobileMenu links={navLinks} className="hidden lg:block">
                            {!user && (
                                <AuthBar
                                    isDropdownItem
                                    className="hidden md:flex"
                                    openModal={openModal}
                                    closeModal={closeModal}
                                />
                            )}
                        </MobileMenu>
                    </div>
                </div>
                <GradientLine className="absolute top-full left-0" />
            </header>

            <Modal />
        </>
    );
};

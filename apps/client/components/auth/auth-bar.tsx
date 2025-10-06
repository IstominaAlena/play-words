"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { cn } from "@repo/ui/class-names";
import { Button, SecondaryButton } from "@repo/ui/core/button";

import { useModal } from "@repo/common/hooks/use-modal.tsx";

import { SignInModal } from "./sign-in-modal";
import { SignUpModal } from "./sign-up-modal";

interface Props {
    className?: string;
}

export const AuthBar: FC<Props> = ({ className }) => {
    const t = useTranslations("auth");

    const { Modal, openModal, closeModal } = useModal();

    const onSignupButtonClick = () => openModal(<SignUpModal />);

    const onSignInButtonClick = () => openModal(<SignInModal />);

    return (
        <>
            <div
                className={cn(
                    "flex w-full items-center gap-4 md:flex-col md:p-4 lg:gap-2",
                    className,
                )}
            >
                <SecondaryButton onClick={onSignupButtonClick} className="md:bg-secondary_dark">
                    {t("sign_up")}
                </SecondaryButton>
                <Button onClick={onSignInButtonClick} className="md:bg-secondary_dark">
                    {t("sign_in")}
                </Button>
            </div>
            <Modal />
        </>
    );
};

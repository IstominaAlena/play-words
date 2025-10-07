"use client";

import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";

import { cn } from "@repo/ui/class-names";
import { Button, SecondaryButton } from "@repo/ui/core/button";
import { DropdownMenuItem } from "@repo/ui/core/dropdown-menu";

import { SignInModal } from "./sign-in-modal";
import { SignUpModal } from "./sign-up-modal";

interface Props {
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
    isDropdownItem?: boolean;
    className?: string;
}

export const AuthBar: FC<Props> = ({ openModal, className, isDropdownItem, closeModal }) => {
    const t = useTranslations("auth");

    const onSignupButtonClick = () => openModal(<SignUpModal closeModal={closeModal} />);

    const onSignInButtonClick = () => openModal(<SignInModal closeModal={closeModal} />);

    if (isDropdownItem) {
        return (
            <div className={cn("flex-col gap-2 px-4 py-4", className)}>
                <DropdownMenuItem>
                    <SecondaryButton onClick={onSignupButtonClick} className="md:bg-secondary_dark">
                        {t("sign_up")}
                    </SecondaryButton>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button onClick={onSignInButtonClick} className="md:bg-secondary_dark">
                        {t("sign_in")}
                    </Button>
                </DropdownMenuItem>
            </div>
        );
    }

    return (
        <div
            className={cn("flex w-full items-center gap-4 md:flex-col md:p-4 lg:gap-2", className)}
        >
            <SecondaryButton onClick={onSignupButtonClick} className="md:bg-secondary_dark">
                {t("sign_up")}
            </SecondaryButton>

            <Button onClick={onSignInButtonClick} className="md:bg-secondary_dark">
                {t("sign_in")}
            </Button>
        </div>
    );
};

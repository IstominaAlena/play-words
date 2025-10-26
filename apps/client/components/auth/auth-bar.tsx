"use client";

import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";

import { cn } from "@repo/ui/class-names";
import { Button } from "@repo/ui/core/button";
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

    const onSignInButtonClick = () =>
        openModal(<SignInModal closeModal={closeModal} openModal={openModal} />);

    if (isDropdownItem) {
        return (
            <div className={cn("flex-col gap-2 px-4 py-4", className)}>
                <DropdownMenuItem>
                    <Button onClick={onSignupButtonClick} className="md:bg-secondary_dark">
                        {t("sign_up")}
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button
                        variant="SUCCESS"
                        onClick={onSignInButtonClick}
                        className="md:bg-secondary_dark"
                    >
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
            <Button onClick={onSignupButtonClick} className="md:bg-secondary_dark">
                {t("sign_up")}
            </Button>

            <Button
                variant="SUCCESS"
                onClick={onSignInButtonClick}
                className="md:bg-secondary_dark"
            >
                {t("sign_in")}
            </Button>
        </div>
    );
};

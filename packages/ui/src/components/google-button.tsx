"use client";

import { FC } from "react";

import { Variant } from "@repo/common/types/common";

import { Button } from "../core/button";
import { GoogleIcon } from "../icons/google";

interface Props {
    text: string;
    url?: string | null;
    onClick?: () => void;
    className?: string;
    isLoading?: boolean;
    variant?: Variant;
}

export const GoogleButton: FC<Props> = ({ text, url, onClick, className, isLoading, variant }) => {
    const onGoogleButtonClick = () => {
        if (url) {
            window.location.href = url;
        }
        onClick?.();
    };

    return (
        <Button
            className="bg-secondary_bg gap-2"
            buttonClassName={className}
            onClick={onGoogleButtonClick}
            isLoading={isLoading}
            variant={variant}
        >
            <GoogleIcon width={24} height={24} />
            {text}
        </Button>
    );
};

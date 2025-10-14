import { FC } from "react";

import { Button } from "../core/button";
import { GoogleIcon } from "../icons/google";

interface Props {
    text: string;
    url?: string | null;
    onClick?: () => void;
    className?: string;
    isLoading?: boolean;
}

export const GoogleButton: FC<Props> = ({ text, url, onClick, className, isLoading }) => {
    const onGoogleButtonClick = () => {
        if (url) {
            window.location.href = url;
            return;
        }
        onClick?.();
    };

    return (
        <Button
            className="bg-secondary_dark gap-2"
            buttonClassName={className}
            onClick={onGoogleButtonClick}
            isLoading={isLoading}
        >
            <GoogleIcon width={24} height={24} />
            {text}
        </Button>
    );
};

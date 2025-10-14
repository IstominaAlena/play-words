import { FC } from "react";

import { Button } from "../core/button";
import { GoogleIcon } from "../icons/google";

interface Props {
    text: string;
    url?: string;
    onClick?: () => void;
    className?: string;
}

export const GoogleButton: FC<Props> = ({ text, url, onClick, className }) => {
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
        >
            <GoogleIcon width={24} height={24} />
            {text}
        </Button>
    );
};

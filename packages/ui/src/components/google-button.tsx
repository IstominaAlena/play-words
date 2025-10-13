import { FC } from "react";

import { Button } from "../core/button";
import { GoogleIcon } from "../icons/google";

interface Props {
    text: string;
    url: string;
}

export const GoogleButton: FC<Props> = ({ text, url }) => {
    const onGoogleButtonClick = () => {
        window.location.href = url;
    };

    return (
        <Button className="bg-secondary_dark gap-2" onClick={onGoogleButtonClick}>
            <GoogleIcon width={24} height={24} />
            {text}
        </Button>
    );
};

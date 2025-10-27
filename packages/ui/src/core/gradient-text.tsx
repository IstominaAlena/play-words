import { FC } from "react";

import { cn } from "../utils/class-names";

interface Props {
    text: string;
    className?: string;
}

export const GradientText: FC<Props> = ({ text, className }) => {
    return (
        <span
            className={cn(
                "from-accent_dark via-accent_light to-accent_dark bg-gradient-to-r bg-clip-text text-transparent",
                className,
            )}
        >
            {text}
        </span>
    );
};

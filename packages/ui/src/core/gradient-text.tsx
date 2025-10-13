import { FC } from "react";

interface Props {
    text: string;
}

export const GradientText: FC<Props> = ({ text }) => {
    return (
        <span className="from-accent_dark via-accent_light to-accent_dark bg-gradient-to-r bg-clip-text text-transparent">
            {text}
        </span>
    );
};

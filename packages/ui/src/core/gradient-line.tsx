import { FC } from "react";

import { cn } from "../utils/class-names";

interface Props {
    className?: string;
}

export const GradientLine: FC<Props> = ({ className }) => (
    <div className={cn("bg-accent_dark_gradient h-px w-full", className)} />
);

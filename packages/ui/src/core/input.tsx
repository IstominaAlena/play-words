"use client";

import { ComponentProps, FC, useState } from "react";

import { cn } from "../utils/class-names";
import { GlowingContainer } from "./glowing-container";

interface Props extends ComponentProps<"input"> {
    isError?: boolean;
}

export const Input: FC<Props> = ({ className, type, isError, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    const onFocus = () => setIsFocused(true);

    const onBlur = () => setIsFocused(false);

    return (
        <GlowingContainer
            containerClassName="disabled:pointer-events-none disabled:opacity-50"
            contentClassName={cn("p-0", isFocused && "border-accent_dark")}
            glowClassName={cn(
                isFocused && "bg-accent_light_gradient",
                isError && "bg-error_gradient",
            )}
        >
            <input
                type={type}
                data-slot="input"
                className={cn(
                    "placeholder:text-neutral text-secondary_light caret-accent_light w-full rounded-[inherit] px-5 py-2 outline-none",
                    className,
                )}
                {...props}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </GlowingContainer>
    );
};

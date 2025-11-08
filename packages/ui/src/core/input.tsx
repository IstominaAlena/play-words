"use client";

import { ComponentProps, FC, useMemo, useState } from "react";

import { Variant } from "@repo/common/types/common";

import { cn } from "../utils/class-names";
import { GlowingContainer } from "./glowing-container";

interface Props extends ComponentProps<"input"> {
    isError?: boolean;
    onInputBlur?: () => void;
}

export const Input: FC<Props> = ({ className, type, isError, onInputBlur, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    const onFocus = () => setIsFocused(true);

    const onBlur = () => {
        onInputBlur?.();
        setIsFocused(false);
    };

    const variant: Variant = isError ? "ERROR" : isFocused ? "SUCCESS" : "NEUTRAL";

    return (
        <GlowingContainer
            containerClassName="disabled:pointer-events-none disabled:opacity-50"
            contentClassName={cn("p-0", isFocused && "border-accent_dark")}
            variant={variant}
        >
            <input
                type={type}
                data-slot="input"
                className={cn(
                    "placeholder:text-neutral text-secondary_text caret-accent_light w-full rounded-[inherit] px-5 py-2 outline-none",
                    "[&::-webkit-inner-spin-button]:appearance-none",
                    "[&::-webkit-outer-spin-button]:appearance-none",
                    "[appearance:textfield]",
                    className,
                )}
                {...props}
                onFocus={onFocus}
                onBlur={onBlur}
            />
        </GlowingContainer>
    );
};

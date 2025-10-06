"use client";

import { ComponentProps, FC, useState } from "react";

import { cn } from "../utils/class-names";

interface Props extends ComponentProps<"input"> {
    isError?: boolean;
}

export const Input: FC<Props> = ({ className, type, isError, ...props }) => {
    const [isFocused, setIsFocused] = useState(false);

    const onFocus = () => setIsFocused(true);

    const onBlur = () => setIsFocused(false);

    return (
        <div className="group relative h-min w-full cursor-pointer rounded-full p-px disabled:pointer-events-none disabled:opacity-50">
            <div
                className={cn(
                    "bg-primary_dark text-primary_light relative z-10 h-full w-full rounded-[inherit] text-sm capitalize",
                    className,
                )}
            >
                <input
                    type={type}
                    data-slot="input"
                    className={cn(
                        "placeholder:text-neutral text-secondary_light caret-accent_light border-secondary_light/40 w-full rounded-[inherit] border px-5 py-2 outline-none",
                        isFocused && "border-accent_dark",
                        className,
                    )}
                    {...props}
                    onFocus={onFocus}
                    onBlur={onBlur}
                />
            </div>
            <div
                className={cn(
                    "bg-primary_light/40 absolute top-1/2 left-1/2 z-1 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[inherit] blur-[2px] transition-all duration-300 group-hover:blur-xs",
                    isFocused && "bg-accent_light_gradient",
                    isError && "bg-error_gradient",
                )}
            />
        </div>
    );
};

"use client";

import { ComponentProps, FC, ReactNode } from "react";

import { Variant } from "@repo/common/types/common";

import { cn } from "../utils/class-names";
import { HoverBorderGradient } from "./hover-border-gradient";
import { Loader } from "./loader";

interface Props extends ComponentProps<"button"> {
    children?: ReactNode;
    isLoading?: boolean;
    buttonClassName?: string;
    variant?: Variant;
}

const Button: FC<Props> = ({
    children,
    className,
    buttonClassName,
    disabled,
    onClick,
    isLoading,
    variant,
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
            "w-full outline-none disabled:pointer-events-none disabled:opacity-50",
            isLoading && "pointer-events-none",
            buttonClassName,
        )}
    >
        <HoverBorderGradient
            containerClassName="rounded-full w-full"
            className={className}
            variant={variant}
        >
            {isLoading ? <Loader /> : children}
        </HoverBorderGradient>
    </button>
);

const GhostButton: FC<ComponentProps<"button">> = ({ children, className, ...props }) => (
    <button
        {...props}
        className={cn(
            "text-secondary_light hover:text-primary_light cursor-pointer text-sm capitalize underline transition-all duration-300 outline-none",
            className,
        )}
    >
        {children}
    </button>
);

export { Button, GhostButton };

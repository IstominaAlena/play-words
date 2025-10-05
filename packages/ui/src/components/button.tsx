import { ComponentProps, FC, PropsWithChildren } from "react";

import { cn } from "../utils/class-names";
import { HoverBorderGradient } from "./hover-border-gradient";

interface Props extends PropsWithChildren {
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    isLoading?: boolean;
}

const Button: FC<Props> = ({ children, className, disabled, onClick, isLoading }) => (
    <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        onClick={onClick}
        className={cn(
            "bg-primary_dark text-primary_light flex cursor-pointer items-center px-5 py-2 text-sm capitalize",
            className,
        )}
        disabled={disabled}
        isLoading={isLoading}
    >
        {children}
    </HoverBorderGradient>
);

const SecondaryButton: FC<ComponentProps<"button">> = ({ children, className, ...props }) => (
    <button
        {...props}
        className="group relative h-min cursor-pointer rounded-full p-px disabled:pointer-events-none disabled:opacity-50"
    >
        <div
            className={cn(
                "bg-primary_dark text-primary-light relative z-10 h-full w-full rounded-[inherit] px-5 py-2 text-sm capitalize",
                className,
            )}
        >
            {children}
        </div>
        <div className="bg-primary_light/20 absolute top-1/2 left-1/2 z-1 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[inherit] blur-[2px] transition-all duration-300 group-hover:blur-xs" />
    </button>
);

const GhostButton: FC<ComponentProps<"button">> = ({ children, className, ...props }) => (
    <button
        {...props}
        className={cn(
            "text-secondary_light hover:text-primary_light cursor-pointer text-sm capitalize underline transition-all duration-300",
            className,
        )}
    >
        {children}
    </button>
);

export { Button, SecondaryButton, GhostButton };

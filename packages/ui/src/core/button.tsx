import { ComponentProps, FC, ReactNode } from "react";

import { cn } from "../utils/class-names";
import { GlowingContainer } from "./glowing-container";
import { HoverBorderGradient } from "./hover-border-gradient";
import { Loader } from "./loader";

interface Props extends ComponentProps<"button"> {
    children?: ReactNode;
    isLoading?: boolean;
    buttonClassName?: string;
}

const Button: FC<Props> = ({
    children,
    className,
    buttonClassName,
    disabled,
    onClick,
    isLoading,
}) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={cn(
            "w-full disabled:pointer-events-none disabled:opacity-50",
            isLoading && "pointer-events-none",
            buttonClassName,
        )}
    >
        <HoverBorderGradient
            containerClassName="rounded-full w-full"
            className={cn("", className)}
            isLoading={isLoading}
        >
            {isLoading ? <Loader size="small" /> : children}
        </HoverBorderGradient>
    </button>
);

const SecondaryButton: FC<ComponentProps<"button">> = ({ children, className, ...props }) => (
    <button
        {...props}
        className={cn(
            "group h-min w-full cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        )}
    >
        <GlowingContainer contentClassName={className}>{children}</GlowingContainer>
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

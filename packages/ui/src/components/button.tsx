import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import { ComponentProps, FC } from "react";

import "../styles/global.css";
import { cn } from "../utils/class-names";

const buttonVariants = cva("", {
    variants: {
        variant: {
            default: "",
        },
        size: {
            default: "",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

interface ButtonProps extends ComponentProps<"button">, VariantProps<typeof buttonVariants> {
    asChild?: boolean;
}

const Button: FC<ButtonProps> = ({ className, variant, size, asChild = false, ...props }) => {
    const Comp = asChild ? Slot : "button";

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
};

interface LinkButtonProps extends ComponentProps<"a">, VariantProps<typeof buttonVariants> {
    href: string;
}

const LinkButton: FC<LinkButtonProps> = ({ className, variant, size, href = "", ...props }) => {
    return (
        <Link href={href} className={cn(buttonVariants({ variant, size, className }))} {...props} />
    );
};

export { Button, LinkButton, buttonVariants };

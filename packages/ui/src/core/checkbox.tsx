"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { ComponentProps, FC, PropsWithChildren } from "react";

import { cn } from "../utils/class-names";
import { Label } from "./label";

interface Props extends ComponentProps<typeof CheckboxPrimitive.Root & PropsWithChildren> {
    labelClassName?: string;
    containerClassName?: string;
}

export const Checkbox: FC<Props> = ({
    children,
    className,
    labelClassName,
    containerClassName,
    ...props
}) => {
    return (
        <div className={cn("flex items-center gap-2", containerClassName)}>
            <CheckboxPrimitive.Root
                data-slot="checkbox"
                id="checkbox"
                className={cn(
                    "data-[state=checked]:border-primary bg-secondary_dark border-primary_light/20 z-10 size-4 shrink-0 rounded-sm border outline-none",
                    className,
                )}
                {...props}
            >
                <CheckboxPrimitive.Indicator
                    data-slot="checkbox-indicator"
                    className="flex items-center justify-center text-current transition-none"
                >
                    <CheckIcon className="text-accent_light size-3.5" />
                </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>

            <Label htmlFor="#checkbox" className={labelClassName}>
                {children}
            </Label>
        </div>
    );
};

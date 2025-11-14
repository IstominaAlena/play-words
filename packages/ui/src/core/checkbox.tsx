"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";
import { ComponentProps, FC, PropsWithChildren } from "react";

import { cn } from "../utils/class-names";
import { Label } from "./label";

interface Props extends ComponentProps<typeof CheckboxPrimitive.Root & PropsWithChildren> {
    labelClassName?: string;
    containerClassName?: string;
    label: string;
}

export const Checkbox: FC<Props> = ({
    className,
    labelClassName,
    containerClassName,
    label,
    ...props
}) => {
    return (
        <div className={cn("group flex w-fit items-center gap-2", containerClassName)}>
            <CheckboxPrimitive.Root
                data-slot="checkbox"
                id={`checkbox-${label}-${props.value ?? ""}`}
                className={cn(
                    "bg-secondary_bg border-neutral group-hover:border-accent_dark z-10 size-4 shrink-0 rounded-sm border outline-none disabled:opacity-50",
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

            <Label htmlFor={`checkbox-${label}-${props.value ?? ""}`} className={labelClassName}>
                {label}
            </Label>
        </div>
    );
};

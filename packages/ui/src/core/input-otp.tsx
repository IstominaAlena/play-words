"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { ComponentProps, FC, useContext } from "react";

import { cn } from "../utils/class-names";
import { GlowingContainer } from "./glowing-container";

const CoreInputOTP: FC<
    ComponentProps<typeof OTPInput> & {
        containerClassName?: string;
    }
> = ({ className, containerClassName, ...props }) => (
    <OTPInput
        data-slot="input-otp"
        containerClassName={cn(
            "flex items-center gap-2 has-disabled:opacity-50",
            containerClassName,
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
    />
);

const InputOTPGroup: FC<ComponentProps<"div">> = ({ className, ...props }) => {
    return (
        <div
            data-slot="input-otp-group"
            className={cn(
                "border-neutral flex items-center overflow-hidden rounded-lg border",
                className,
            )}
            {...props}
        />
    );
};

const InputOTPSlot: FC<
    ComponentProps<"div"> & {
        index: number;
    }
> = ({ index, className, ...props }) => {
    const inputOTPContext = useContext(OTPInputContext);
    const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};

    return (
        <div
            data-slot="input-otp-slot"
            data-active={isActive}
            className={cn(
                "border-neutral text-primary_light relative flex h-10 w-10 items-center justify-center border text-base",
                className,
            )}
            {...props}
        >
            {char}
            {hasFakeCaret && (
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="animate-caret-blink bg-accent_light h-4 w-px duration-1000" />
                </div>
            )}
        </div>
    );
};

interface InputOtpProps {
    maxLength?: number;
    value: string;
    onChange: (value: string) => void;
}

export const InputOTP: FC<InputOtpProps> = ({ maxLength = 6, value, onChange }) => {
    const slots = Array.from({ length: 6 }, (_, index) => (
        <InputOTPSlot key={index} index={index} />
    ));

    return (
        <GlowingContainer
            containerClassName="w-fit rounded-lg"
            contentClassName="p-0 bg-secondary_dark"
        >
            <CoreInputOTP maxLength={maxLength} value={value} onChange={onChange}>
                <InputOTPGroup>{slots}</InputOTPGroup>
            </CoreInputOTP>
        </GlowingContainer>
    );
};

"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { FC } from "react";
import { Toaster as Sonner, ToasterProps, toast } from "sonner";

import { ErrorIcon } from "../icons/error";
import { SuccessIcon } from "../icons/success";
import { cn } from "../utils/class-names";
import { Text } from "./typography";

export const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme();

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            style={
                {
                    "--normal-bg": "#0a0a0a",
                    "--normal-text": "#06D6A0",
                    "--normal-border": "#104F55",
                } as React.CSSProperties
            }
            {...props}
        />
    );
};

interface ToastProps {
    message: string;
    isError?: boolean;
}

const Toast: FC<ToastProps> = ({ message, isError }) => {
    const t = useTranslations("global");

    const Icon = isError ? ErrorIcon : SuccessIcon;
    return (
        <div
            className={cn(
                "group relative w-[20rem] cursor-pointer rounded-lg border p-px",
                isError ? "border-error_dark" : "border-accent_dark",
            )}
        >
            <div
                className={cn(
                    "bg-primary_dark text-primary_light relative z-10 flex h-full w-full items-start gap-3 rounded-[inherit] p-4 text-sm",
                )}
            >
                <Icon />
                <div className="flex flex-col gap-1">
                    <Text
                        className={cn(
                            "capitalize",
                            isError ? "text-error_light" : "text-accent_light",
                        )}
                    >
                        {t(isError ? "error" : "success")}
                    </Text>
                    {message}
                </div>
            </div>
            <div
                className={cn(
                    "absolute top-1/2 left-1/2 z-1 h-full w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[inherit] blur-sm",
                    isError ? "bg-error_gradient" : "bg-accent_dark_gradient",
                )}
            />
        </div>
    );
};

export const showToast = {
    success: (message: string) => toast.custom(() => <Toast message={message} />),
    error: (message: string) => toast.custom(() => <Toast message={message} isError />),
};

"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { cn } from "../utils/class-names";
import { Text } from "./typography";

interface Props {
    message?: string;
    className?: string;
}

export const ErrorMessage: FC<Props> = ({ message, className }) => {
    const t = useTranslations("form_error");

    if (!message) return null;

    return <Text className={cn("text-error text-xs", className)}>*{t(message)}</Text>;
};

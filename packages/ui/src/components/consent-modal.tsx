"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { Button } from "../core/button";
import { Text, Title } from "../core/typography";

interface Props {
    title: string;
    text: string;
    onCancel: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

export const ConsentModal: FC<Props> = ({ title, text, onCancel, onConfirm, isLoading }) => {
    const tGlobal = useTranslations("global");

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Title>{title}</Title>
            <Text className="text-center">{text}</Text>

            <div className="xs:flex-col flex w-full items-center gap-4">
                <Button
                    type="button"
                    variant="ERROR"
                    isLoading={isLoading}
                    onClick={onConfirm}
                    className="bg-secondary_dark"
                >
                    {title}
                </Button>
                <Button className="bg-secondary_dark" onClick={onCancel}>
                    {tGlobal("cancel")}
                </Button>
            </div>
        </div>
    );
};

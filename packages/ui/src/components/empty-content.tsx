"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { Text } from "../core/typography";
import { EmptyContentIcon } from "../icons/empty-content";

export const EmptyContent: FC = () => {
    const t = useTranslations("global");

    return (
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2">
            <EmptyContentIcon width={150} height={150} />
            <Text className="text-2xl!">{t("empty_content")}</Text>
        </div>
    );
};

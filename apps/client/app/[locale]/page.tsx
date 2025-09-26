"use client";

import { useTranslations } from "next-intl";

import { Button } from "@repo/ui/components/button";

const HomePage = () => {
    const t = useTranslations("home_page");

    return (
        <div className={"bg-red-200"}>
            <Button className="text-green-600">{t("title")}</Button>
        </div>
    );
};

export default HomePage;

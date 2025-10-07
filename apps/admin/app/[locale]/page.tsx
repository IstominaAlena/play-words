"use client";

import { useTranslations } from "next-intl";

const HomePage = () => {
    const t = useTranslations("home_page");

    return <div className={"bg-red-200"}></div>;
};

export default HomePage;

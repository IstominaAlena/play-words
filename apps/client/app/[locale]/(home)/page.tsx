"use client";

import { useTranslations } from "next-intl";

import { SparklesCore } from "@repo/ui/core/sparkles";
import { PageTitle } from "@repo/ui/core/typography";

const HomePage = () => {
    const t = useTranslations("home_page");
    return (
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <div className="absolute top-px left-1/2 h-40 w-[60rem] -translate-x-1/2">
                {/* Gradients */}
                <div className="via-accent_dark absolute inset-x-0 top-0 h-[2px] w-full bg-gradient-to-r from-transparent to-transparent blur-sm" />
                <div className="via-accent_light absolute inset-x-0 top-0 h-[5px] w-full bg-gradient-to-r from-transparent to-transparent blur-sm" />

                {/* Core component */}
                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    speed={1}
                    particleDensity={1000}
                    className="h-full w-full"
                    particleColor="#FFFFFF"
                />

                {/* Radial Gradient to prevent sharp edges */}
                <div className="bg-primary_dark absolute inset-0 h-full w-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
            </div>
            <div className="relative">
                <PageTitle>{t("title")}</PageTitle>
            </div>
        </div>
    );
};

export default HomePage;

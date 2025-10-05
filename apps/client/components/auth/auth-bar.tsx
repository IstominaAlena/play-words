import { useTranslations } from "next-intl";
import { FC } from "react";

import { cn } from "@repo/ui/class-names";
import { Button, SecondaryButton } from "@repo/ui/core/button";

interface Props {
    className?: string;
}

export const AuthBar: FC<Props> = ({ className }) => {
    const t = useTranslations("auth");

    return (
        <div
            className={cn("flex w-full items-center gap-4 md:flex-col md:p-4 lg:gap-2", className)}
        >
            <SecondaryButton onClick={() => {}} className="md:bg-secondary_dark">
                {t("sign_up")}
            </SecondaryButton>
            <Button onClick={() => {}} className="md:bg-secondary_dark">
                {t("sign_in")}
            </Button>
        </div>
    );
};

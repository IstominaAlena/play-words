import { useTranslations } from "next-intl";
import { FC, useMemo } from "react";

import { CopyButton } from "@repo/ui/core/copy-button";
import { GlowingContainer } from "@repo/ui/core/glowing-container";
import { QrCode } from "@repo/ui/core/qr-code";
import { Text, Title } from "@repo/ui/core/typography";

interface Props {
    url: string;
    secret: string;
}

export const OtpModalSettings: FC<Props> = ({ url, secret }) => {
    const t = useTranslations("account");
    const tGlobal = useTranslations("global");

    const divider = useMemo(
        () => (
            <div className="text-neutral flex w-full items-center gap-4">
                <div className="bg-horizontal_neutral_gradient h-px w-full" />
                <span>{tGlobal("or")}</span>
                <div className="bg-horizontal_neutral_gradient h-px w-full" />
            </div>
        ),
        [tGlobal],
    );

    return (
        <div className="relative flex flex-col items-center justify-center gap-4">
            <Title className="text-center">{t("authenticator_title")}</Title>
            <Text className="text-center">{t("authenticator_description")}</Text>
            <QrCode value={url} />
            {divider}
            <div className="flex w-full flex-col gap-1">
                <Text>{t("otp_enter_manually")}</Text>
                <GlowingContainer contentClassName="bg-secondary_dark flex items-center justify-between gap-2">
                    <Text className="text-primary_light sm:text-xxs!">{secret}</Text>
                    <CopyButton value={secret} />
                </GlowingContainer>
            </div>
        </div>
    );
};

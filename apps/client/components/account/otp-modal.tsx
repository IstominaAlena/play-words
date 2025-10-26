import { useTranslations } from "next-intl";
import { FC } from "react";

import { GlowingContainer } from "@repo/ui/core/glowing-container";
import { QrCode } from "@repo/ui/core/qr-code";
import { Text, Title } from "@repo/ui/core/typography";

interface Props {
    url: string;
    secret: string;
}

export const OtpModal: FC<Props> = ({ url, secret }) => {
    const t = useTranslations("account");
    const tGlobal = useTranslations("global");

    return (
        <div className="relative flex flex-col items-center justify-center gap-4">
            <Title className="text-center">{t("authenticator_title")}</Title>
            <Text className="text-center">{t("authenticator_description")}</Text>
            <QrCode value={url} />
            <div className="text-neutral flex w-full items-center gap-4">
                <div className="bg-horizontal_neutral_gradient h-px w-full" />
                <span>{tGlobal("or")}</span>
                <div className="bg-horizontal_neutral_gradient h-px w-full" />
            </div>
            <div className="flex w-full flex-col gap-1">
                <Text>{t("otp_enter_manually")}</Text>
                <GlowingContainer contentClassName="bg-secondary_dark">
                    <Text className="text-primary_light">{secret}</Text>
                </GlowingContainer>
            </div>
        </div>
    );
};

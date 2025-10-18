import { useTranslations } from "next-intl";
import { FC } from "react";

import { QrCode } from "@repo/ui/core/qr-code";
import { Text, Title } from "@repo/ui/core/typography";

interface Props {
    url: string;
}

export const EnableOtpModal: FC<Props> = ({ url }) => {
    const t = useTranslations("account");

    return (
        <div className="relative flex flex-col items-center justify-center gap-6">
            <Title className="text-center">{t("authenticator_title")}</Title>
            <Text className="text-center">{t("authenticator_description")}</Text>
            <QrCode value={url} />
        </div>
    );
};

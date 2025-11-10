import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { ResetPasswordPage } from "@/components/pages/reset-password-page";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations("meta");

    return {
        title: t("reset_password_title"),
        description: t("reset_password_description"),
        openGraph: {
            title: t("reset_password_title"),
            description: t("reset_password_description"),
        },
    };
}

const ResetPassword = () => <ResetPasswordPage />;

export default ResetPassword;

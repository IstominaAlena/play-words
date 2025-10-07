"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";

import { Form } from "@repo/ui/components/form";
import { FormInput } from "@repo/ui/components/form-input";
import { GlowingContainer } from "@repo/ui/core/glowing-container";
import { Meteors } from "@repo/ui/core/meteors";
import { showToast } from "@repo/ui/core/sonner";
import { Text, Title } from "@repo/ui/core/typography";

import useWindowDimensions from "@repo/common/hooks/use-window-dimensions.ts";
import { resetUserPasswordRequestSchema } from "@repo/common/schemas/users";
import { ResetUserPasswordRequest } from "@repo/common/types/users";

import { useResetPasswordRequest } from "@/api/auth/mutations";

const defaultValues = {
    email: "",
};

export const ResetPasswordRequestPage: FC = () => {
    const t = useTranslations("auth");
    const tForm = useTranslations("form");

    const { isMd } = useWindowDimensions();

    const { mutateAsync: resetPasswordRequest, isPending } = useResetPasswordRequest();

    const onSubmit: SubmitHandler<ResetUserPasswordRequest> = async (formData) => {
        try {
            await resetPasswordRequest(formData);
        } catch (error: any) {
            showToast.error(error.message);
        }
    };
    return (
        <>
            <Title>{t("forgot_password")}</Title>
            <Text>{t("forgot_password_subtitle")}</Text>

            <Form<ResetUserPasswordRequest>
                defaultValues={defaultValues}
                schema={resetUserPasswordRequestSchema}
                onSubmit={onSubmit}
                isLoading={isPending}
                render={({ control }) => (
                    <>
                        <FormInput
                            control={control}
                            name="email"
                            type="email"
                            label={tForm("email")}
                            placeholder={tForm("email_placeholder")}
                            className="bg-secondary_dark"
                        />
                    </>
                )}
            />
        </>
    );
};

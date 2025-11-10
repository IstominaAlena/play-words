"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";

import { Form } from "@repo/ui/components/form";
import { FormPasswordInput } from "@repo/ui/components/form-password-input";
import { showToast } from "@repo/ui/core/sonner";
import { Text, Title } from "@repo/ui/core/typography";

import { changePasswordDtoSchema } from "@repo/common/schemas/account";
import { ChangePasswordDto } from "@repo/common/types/account";

import { useResetPassword } from "@/api/auth/mutations";

const defaultValues = {
    password: "",
    confirmPassword: "",
};

export const ResetPasswordPage: FC = () => {
    const t = useTranslations("auth");
    const tForm = useTranslations("form");

    const { mutateAsync: resetPassword, isPending } = useResetPassword();

    const onSubmit: SubmitHandler<ChangePasswordDto> = async (formData) => {
        const dto = {
            password: formData.password,
        };

        try {
            await resetPassword(dto);
            showToast.success(t("reset_password_success"));
        } catch (error: unknown) {
            if (error instanceof Error) {
                showToast.error(error.message);
            }
        }
    };

    return (
        <>
            <Title>{t("reset_password_title")}</Title>
            <Text className="text-center">{t("reset_password_subtitle")}</Text>

            <Form<ChangePasswordDto>
                defaultValues={defaultValues}
                schema={changePasswordDtoSchema}
                onSubmit={onSubmit}
                isLoading={isPending}
                render={({ control }) => (
                    <>
                        <FormPasswordInput
                            control={control}
                            name="password"
                            label={tForm("new_password")}
                            className="bg-secondary_bg"
                        />

                        <FormPasswordInput
                            control={control}
                            name="confirmPassword"
                            label={tForm("confirm_password")}
                            className="bg-secondary_bg"
                        />
                    </>
                )}
            />
        </>
    );
};

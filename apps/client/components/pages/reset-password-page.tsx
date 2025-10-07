"use client";

import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { FC, useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { Form } from "@repo/ui/components/form";
import { FormInput } from "@repo/ui/components/form-input";
import { Checkbox } from "@repo/ui/core/checkbox";
import { showToast } from "@repo/ui/core/sonner";
import { Text, Title } from "@repo/ui/core/typography";

import { useResetPassword } from "@/api/auth/mutations";
import { resetUserPasswordDtoSchema } from "@/schemas/index";
import { ResetPasswordDto } from "@/types/index";

const defaultValues = {
    password: "",
    confirmPassword: "",
};

export const ResetPasswordPage: FC = () => {
    const t = useTranslations("auth");
    const tForm = useTranslations("form");

    const searchParams = useSearchParams();

    const token = searchParams.get("token") ?? "";

    const { mutateAsync: resetPassword, isPending } = useResetPassword();

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePassword = () => setIsPasswordVisible((state) => !state);

    const onSubmit: SubmitHandler<ResetPasswordDto> = async (formData) => {
        const dto = {
            token,
            password: formData.password,
        };

        try {
            await resetPassword(dto);
            showToast.success(t("reset_password_success"));
        } catch (error: any) {
            showToast.error(error.message);
        }
    };

    return (
        <>
            <Title>{t("reset_password_title")}</Title>
            <Text className="text-center">{t("reset_password_subtitle")}</Text>

            <Form<ResetPasswordDto>
                defaultValues={defaultValues}
                schema={resetUserPasswordDtoSchema}
                onSubmit={onSubmit}
                isLoading={isPending}
                render={({ control }) => (
                    <>
                        <FormInput
                            control={control}
                            name="password"
                            type={isPasswordVisible ? "text" : "password"}
                            label={tForm("password")}
                            placeholder={tForm("password_placeholder")}
                            className="bg-secondary_dark"
                        />
                        <FormInput
                            control={control}
                            name="confirmPassword"
                            type={isPasswordVisible ? "text" : "password"}
                            label={tForm("confirm_password")}
                            placeholder={tForm("password_placeholder")}
                            className="bg-secondary_dark"
                        />
                        <Checkbox
                            checked={isPasswordVisible}
                            onCheckedChange={togglePassword}
                            containerClassName="my-1"
                        >
                            {tForm("show_password")}
                        </Checkbox>
                    </>
                )}
            />
        </>
    );
};

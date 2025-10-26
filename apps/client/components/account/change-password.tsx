"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";

import { cn } from "@repo/ui/class-names";
import { Form } from "@repo/ui/components/form";
import { FormPasswordInput } from "@repo/ui/components/form-password-input";
import { showToast } from "@repo/ui/core/sonner";
import { Title } from "@repo/ui/core/typography";

import { changePasswordSchema } from "@repo/common/schemas/account";
import { ChangePasswordDto } from "@repo/common/types/account";

import { useChangePassword } from "@/api/account/mutations";

interface Props {
    className?: string;
}

const defaultValues = {
    newPassword: "",
    confirmPassword: "",
};

export const ChangePassword: FC<Props> = ({ className }) => {
    const t = useTranslations("account");
    const tForm = useTranslations("form");

    const { mutateAsync: resetPassword, isPending } = useChangePassword();

    const onSubmit: SubmitHandler<ChangePasswordDto> = async (formData) => {
        const dto = {
            password: formData.password,
        };

        try {
            await resetPassword(dto);
            // TODO: Create user friendly message
            showToast.success("SUCCESS");
        } catch (error: any) {
            showToast.error(error.message);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Title>{t("change_password")}</Title>
            <Form<ChangePasswordDto>
                defaultValues={defaultValues}
                schema={changePasswordSchema}
                onSubmit={onSubmit}
                submitButtonClassName="max-w-[12rem] self-end"
                isLoading={isPending}
                render={({ control }) => (
                    <>
                        <FormPasswordInput
                            control={control}
                            name="password"
                            label={tForm("new_password")}
                            className="bg-secondary_dark"
                        />
                        <FormPasswordInput
                            control={control}
                            name="confirmPassword"
                            label={tForm("confirm_password")}
                            className="bg-secondary_dark"
                        />
                    </>
                )}
            />
        </div>
    );
};

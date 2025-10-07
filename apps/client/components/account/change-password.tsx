"use client";

import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { Form } from "@repo/ui/components/form";
import { FormInput } from "@repo/ui/components/form-input";
import { Checkbox } from "@repo/ui/core/checkbox";
import { showToast } from "@repo/ui/core/sonner";
import { Title } from "@repo/ui/core/typography";

import { changePasswordSchema } from "@/schemas/index";
import { ChangePasswordDto } from "@/types/index";

interface Props {
    className?: string;
}

const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
};

export const ChangePassword: FC<Props> = ({ className }) => {
    const t = useTranslations("account");
    const tForm = useTranslations("form");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePassword = () => setIsPasswordVisible((state) => !state);

    const onSubmit: SubmitHandler<ChangePasswordDto> = async (formData) => {
        try {
            // await signUp(formData);
        } catch (error: any) {
            showToast.error(error.message);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <Title>{t("change_password")}</Title>
            <Form<ChangePasswordDto>
                defaultValues={defaultValues}
                schema={changePasswordSchema}
                onSubmit={onSubmit}
                submitButtonClassName="max-w-[12rem] self-end"
                // isLoading={isPending}
                render={({ control }) => (
                    <>
                        <FormInput
                            control={control}
                            name="oldPassword"
                            type={isPasswordVisible ? "text" : "password"}
                            label={tForm("old_password")}
                            placeholder={tForm("password_placeholder")}
                            className="bg-secondary_dark"
                        />
                        <FormInput
                            control={control}
                            name="newPassword"
                            type={isPasswordVisible ? "text" : "password"}
                            label={tForm("new_password")}
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
        </div>
    );
};

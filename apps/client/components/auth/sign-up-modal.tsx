"use client";

import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { Form } from "@repo/ui/components/form";
import { FormInput } from "@repo/ui/components/form-input";
import { Checkbox } from "@repo/ui/core/checkbox";
import { showToast } from "@repo/ui/core/sonner";
import { Title } from "@repo/ui/core/typography";

import { useSignUp } from "@/api/auth/mutations";
import { signUpUserSchema } from "@/schemas/index";
import { SignUpUser } from "@/types/index";

const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
};

interface Props {
    closeModal: () => void;
}

export const SignUpModal: FC<Props> = ({ closeModal }) => {
    const t = useTranslations("auth");
    const tForm = useTranslations("form");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { mutateAsync: signUp, isPending } = useSignUp();

    const togglePassword = () => setIsPasswordVisible((state) => !state);

    const onSubmit: SubmitHandler<SignUpUser> = async (formData) => {
        try {
            await signUp(formData);
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            closeModal();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <Title>{t("sign_up")}</Title>

            <Form<SignUpUser>
                defaultValues={defaultValues}
                schema={signUpUserSchema}
                onSubmit={onSubmit}
                isLoading={isPending}
                render={({ control }) => (
                    <>
                        <FormInput
                            control={control}
                            name="username"
                            type="text"
                            label={tForm("username")}
                            placeholder={tForm("username_placeholder")}
                            className="bg-secondary_dark"
                        />
                        <FormInput
                            control={control}
                            name="email"
                            type="email"
                            label={tForm("email")}
                            placeholder={tForm("email_placeholder")}
                            className="bg-secondary_dark"
                        />
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
        </div>
    );
};

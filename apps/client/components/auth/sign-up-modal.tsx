"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";

import { Form } from "@repo/ui/components/form";
import { FormInput } from "@repo/ui/components/form-input";
import { FormPasswordInput } from "@repo/ui/components/form-password-input";
import { GoogleButton } from "@repo/ui/components/google-button";
import { showToast } from "@repo/ui/core/sonner";
import { Title } from "@repo/ui/core/typography";

import { signUpDtoSchema } from "@repo/common/schemas/account";
import { SignUpDto } from "@repo/common/types/account";

import { useSignUp } from "@/api/auth/mutations";

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

    const { mutateAsync: signUp, isPending } = useSignUp();

    const onSubmit: SubmitHandler<SignUpDto> = async (formData) => {
        const dto = {
            email: formData.email,
            username: formData.username,
            password: formData.password,
        };

        try {
            await signUp(dto);
        } catch (error: unknown) {
            if (error instanceof Error) {
                showToast.error(error.message);
            }
        } finally {
            closeModal();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <Title>{t("sign_up")}</Title>

            <Form<SignUpDto>
                defaultValues={defaultValues}
                schema={signUpDtoSchema}
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
                            className="bg-secondary_bg"
                        />
                        <FormInput
                            control={control}
                            name="email"
                            type="email"
                            label={tForm("email")}
                            placeholder={tForm("email_placeholder")}
                            className="bg-secondary_bg"
                        />
                        <FormPasswordInput
                            control={control}
                            name="password"
                            label={tForm("password")}
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
            <div className="bg-horizontal_neutral_gradient h-px w-full" />

            <GoogleButton
                text={t("sign_up")}
                url={`${process.env.NEXT_PUBLIC_API_URL}/users/google/auth`}
            />
        </div>
    );
};

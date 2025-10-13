"use client";

import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { Form } from "@repo/ui/components/form";
import { FormInput } from "@repo/ui/components/form-input";
import { GoogleButton } from "@repo/ui/components/google-button";
import { Checkbox } from "@repo/ui/core/checkbox";
import { showToast } from "@repo/ui/core/sonner";
import { Title } from "@repo/ui/core/typography";

import { loginUserSchema } from "@repo/common/schemas/users";
import { LoginUserDto } from "@repo/common/types/users";
import { Link } from "@repo/i18n/config/navigation";

import { useSignIn } from "@/api/auth/mutations";
import { SecondaryRoutes } from "@/enums/routes";

const defaultValues = {
    email: "",
    password: "",
};

interface Props {
    closeModal: () => void;
}

export const SignInModal: FC<Props> = ({ closeModal }) => {
    const t = useTranslations("auth");
    const tForm = useTranslations("form");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { mutateAsync: signIn, isPending } = useSignIn();

    const togglePassword = () => setIsPasswordVisible((state) => !state);

    const onSubmit: SubmitHandler<LoginUserDto> = async (formData) => {
        try {
            await signIn(formData);
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            closeModal();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <Title>{t("sign_in")}</Title>
            <Form<LoginUserDto>
                defaultValues={defaultValues}
                schema={loginUserSchema}
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
                        <FormInput
                            control={control}
                            name="password"
                            type={isPasswordVisible ? "text" : "password"}
                            label={tForm("password")}
                            placeholder={tForm("password_placeholder")}
                            className="bg-secondary_dark"
                        />
                        <div className="flex items-center justify-between gap-2">
                            <Checkbox checked={isPasswordVisible} onCheckedChange={togglePassword}>
                                {tForm("show_password")}
                            </Checkbox>
                            <Link
                                href={SecondaryRoutes.FORGOT_PASSWORD}
                                onClick={closeModal}
                                className="text-neutral text-xs hover:underline"
                            >
                                {t("forgot_password")}
                            </Link>
                        </div>
                    </>
                )}
            />
            <div className="bg-horizontal_neutral_gradient h-px w-full" />

            <GoogleButton
                text={t("sign_in")}
                url={`${process.env.NEXT_PUBLIC_API_URL}/users/google/auth`}
            />
        </div>
    );
};

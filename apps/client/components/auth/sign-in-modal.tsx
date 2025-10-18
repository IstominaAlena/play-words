"use client";

import { useTranslations } from "next-intl";
import { FC, ReactNode } from "react";
import { SubmitHandler } from "react-hook-form";

import { Form } from "@repo/ui/components/form";
import { FormInput } from "@repo/ui/components/form-input";
import { FormPasswordInput } from "@repo/ui/components/form-password-input";
import { GoogleButton } from "@repo/ui/components/google-button";
import { showToast } from "@repo/ui/core/sonner";
import { Title } from "@repo/ui/core/typography";

import { loginUserSchema } from "@repo/common/schemas/users";
import { LoginUserDto } from "@repo/common/types/users";
import { Link } from "@repo/i18n/config/navigation";

import { useSignIn } from "@/api/auth/mutations";
import { SecondaryRoutes } from "@/enums/routes";

import { OtpModal } from "./otp-modal";

const defaultValues = {
    email: "",
    password: "",
};

interface Props {
    openModal: (content: ReactNode) => void;
    closeModal: () => void;
}

export const SignInModal: FC<Props> = ({ openModal, closeModal }) => {
    const t = useTranslations("auth");
    const tForm = useTranslations("form");

    const { mutateAsync: signIn, isPending } = useSignIn();

    const onSubmit: SubmitHandler<LoginUserDto> = async (formData) => {
        try {
            const data = await signIn(formData);

            if (data.otp) {
                openModal(<OtpModal closeModal={closeModal} email={data.email ?? ""} />);
            }
        } catch (error: any) {
            showToast.error(error.message);
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
                        <FormPasswordInput
                            control={control}
                            name="password"
                            label={tForm("password")}
                            className="bg-secondary_dark"
                        />
                        <Link
                            href={SecondaryRoutes.FORGOT_PASSWORD}
                            onClick={closeModal}
                            className="text-neutral text-xs hover:underline"
                        >
                            {t("forgot_password")}
                        </Link>
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

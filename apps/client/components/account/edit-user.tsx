"use client";

import { useTranslations } from "next-intl";
import { FC, useMemo } from "react";
import { SubmitHandler } from "react-hook-form";

import { cn } from "@repo/ui/class-names";
import { Form } from "@repo/ui/components/form";
import { FormInput } from "@repo/ui/components/form-input";
import { showToast } from "@repo/ui/core/sonner";
import { Title } from "@repo/ui/core/typography";

import { updateAccountSchema } from "@repo/common/schemas/account";
import { useUserStore } from "@repo/common/stores/user-store";
import { UpdateAccountDto } from "@repo/common/types/account";

import { useUpdateCurrentUser } from "@/api/account/mutations";

interface Props {
    className?: string;
}

export const EditUser: FC<Props> = ({ className }) => {
    const t = useTranslations("account");
    const tForm = useTranslations("form");

    const { user } = useUserStore();

    const { mutateAsync: updateUser, isPending } = useUpdateCurrentUser();

    const defaultValues = useMemo(
        () => ({
            username: user?.username ?? "",
            email: user?.email ?? "",
        }),
        [user?.email, user?.username],
    );

    const onSubmit: SubmitHandler<UpdateAccountDto> = async (formData) => {
        try {
            await updateUser(formData);
            showToast.success("SUCCESS");
        } catch (error: any) {
            showToast.error(error.message);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Title>{t("account")}</Title>

            <Form<UpdateAccountDto>
                key={user?.id || "empty"}
                defaultValues={defaultValues}
                schema={updateAccountSchema}
                onSubmit={onSubmit}
                submitButtonClassName=" max-w-[12rem] self-end"
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
                            name="username"
                            type="username"
                            label={tForm("username")}
                            placeholder={tForm("username_placeholder")}
                            className="bg-secondary_dark"
                        />
                    </>
                )}
            />
        </div>
    );
};

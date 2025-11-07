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

import { ManageAccountState } from "./manage-account-state";

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
            showToast.success(t("updated_successfully"));
        } catch (error: any) {
            showToast.error(error.message);
        }
    };

    return (
        <div className={cn("flex flex-col justify-between gap-6", className)}>
            <div className="flex flex-col gap-6">
                <Title>{t("account")}</Title>

                <Form<UpdateAccountDto>
                    key={user?.id || "empty"}
                    defaultValues={defaultValues}
                    schema={updateAccountSchema}
                    onSubmit={onSubmit}
                    submitButtonClassName="max-w-default self-end"
                    isLoading={isPending}
                    render={({ control }) => (
                        <>
                            <FormInput
                                control={control}
                                name="email"
                                type="email"
                                label={tForm("email")}
                                placeholder={tForm("email_placeholder")}
                                className="bg-secondary_bg"
                            />
                            <FormInput
                                control={control}
                                name="username"
                                type="username"
                                label={tForm("username")}
                                placeholder={tForm("username_placeholder")}
                                className="bg-secondary_bg"
                            />
                        </>
                    )}
                />
            </div>
            <ManageAccountState
                deletionDate={user?.deletionDate ?? null}
                email={user?.email ?? null}
            />
        </div>
    );
};

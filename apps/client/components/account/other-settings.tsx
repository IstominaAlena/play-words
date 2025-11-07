"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";

import { cn } from "@repo/ui/class-names";
import { Form } from "@repo/ui/components/form";
import { FormInput } from "@repo/ui/components/form-input";
import { showToast } from "@repo/ui/core/sonner";
import { Title } from "@repo/ui/core/typography";

import { DEFAULT_WORDS_PER_TRAINING } from "@repo/common/constants/common";
import { updateAccountSettingsSchema } from "@repo/common/schemas/account";
import { useUserStore } from "@repo/common/stores/user-store";
import { OtherSettingsDto } from "@repo/common/types/account";

import { useUpdateSettings } from "@/api/account/mutations";

interface Props {
    className?: string;
}

export const OtherSettings: FC<Props> = ({ className }) => {
    const t = useTranslations("account");
    const tForm = useTranslations("form");

    const { settings } = useUserStore();

    const { mutateAsync: updateSettings, isPending } = useUpdateSettings();

    const defaultWordsPerTraining = settings?.wordsPerTraining ?? DEFAULT_WORDS_PER_TRAINING;

    const defaultValues = {
        wordsPerTraining: defaultWordsPerTraining,
    };

    const onSubmit: SubmitHandler<OtherSettingsDto> = async (formData) => {
        try {
            await updateSettings(formData);
            showToast.success(t("settings_update_success"));
        } catch (error: any) {
            showToast.error(error.message);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)}>
            <Title>{t("other")}</Title>

            <Form<OtherSettingsDto>
                defaultValues={defaultValues}
                schema={updateAccountSettingsSchema}
                onSubmit={onSubmit}
                isLoading={isPending}
                submitButtonClassName="max-w-default self-end"
                className="h-full"
                containerClassName="flex-1"
                render={({ control }) => (
                    <>
                        <FormInput
                            control={control}
                            name="wordsPerTraining"
                            type="number"
                            label={tForm("words_per_training")}
                            className="bg-secondary_bg"
                        />
                    </>
                )}
            />
        </div>
    );
};

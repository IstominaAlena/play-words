"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";

import { Form } from "@repo/ui/components/form";
import { FormInput } from "@repo/ui/components/form-input";
import { FormTagsInput } from "@repo/ui/components/form-tags-input";
import { showToast } from "@repo/ui/core/sonner";
import { Title } from "@repo/ui/core/typography";

import { createWordSchema } from "@repo/common/schemas/dictionary";
import { CreateWordDto } from "@repo/common/types/dictionary";

import { useAddWord } from "@/api/dictionary/mutations";

const defaultValues = {
    word: "",
    translations: [],
    definitions: [],
};

interface Props {
    closeModal: () => void;
}

export const WordModal: FC<Props> = ({ closeModal }) => {
    const t = useTranslations("dictionary");
    const tForm = useTranslations("form");

    const { mutateAsync: addWord, isPending } = useAddWord();

    const onSubmit: SubmitHandler<CreateWordDto> = async (formData) => {
        try {
            await addWord(formData);
        } catch (error: any) {
            showToast.error(error.message);
        } finally {
            closeModal();
        }
    };
    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <Title>{t("add_word")}</Title>

            <Form<CreateWordDto>
                defaultValues={defaultValues}
                schema={createWordSchema}
                onSubmit={onSubmit}
                isLoading={isPending}
                render={({ control }) => (
                    <>
                        <FormInput
                            control={control}
                            name="word"
                            type="text"
                            label={tForm("word")}
                            className="bg-secondary_dark"
                        />
                        <FormTagsInput
                            control={control}
                            name="translations"
                            label={tForm("translations")}
                            className="bg-secondary_dark"
                        />
                        <FormTagsInput
                            control={control}
                            name="definitions"
                            label={tForm("definitions")}
                            className="bg-secondary_dark"
                        />
                    </>
                )}
            />
        </div>
    );
};

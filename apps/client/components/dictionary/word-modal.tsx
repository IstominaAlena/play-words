"use client";

import { useTranslations } from "next-intl";
import { FC, useState } from "react";
import { SubmitHandler } from "react-hook-form";

import { Form } from "@repo/ui/components/form";
import { FormInput } from "@repo/ui/components/form-input";
import { FormTagsInput } from "@repo/ui/components/form-tags-input";
import { Loader } from "@repo/ui/core/loader";
import { showToast } from "@repo/ui/core/sonner";
import { Title } from "@repo/ui/core/typography";

import { createWordSchema } from "@repo/common/schemas/dictionary";
import { CreateWordDto, Word } from "@repo/common/types/dictionary";

import { useAddWord } from "@/api/dictionary/mutations";
import { useWordInfo } from "@/api/dictionary/queries";

interface Props {
    closeModal: () => void;
    data?: Word;
}

export const WordModal: FC<Props> = ({ closeModal, data }) => {
    const t = useTranslations("dictionary");
    const tForm = useTranslations("form");

    const defaultValues = {
        word: data?.word ?? "",
        translations: data?.translations.map((item) => item.value) ?? [],
        definitions: data?.definitions.map((item) => item.value) ?? [],
    };

    const [word, setWord] = useState("");

    const { mutateAsync: addWord, isPending: addWordPending } = useAddWord();

    const { data: wordInfo, isPending: wordInfoPending } = useWordInfo(word);

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
                isLoading={addWordPending}
                render={({ control, watch }) => {
                    const currentWord = watch("word");

                    const onInputBlur = () => setWord(currentWord);

                    return (
                        <>
                            <div className="relative">
                                <FormInput
                                    control={control}
                                    name="word"
                                    type="text"
                                    label={tForm("word")}
                                    className="bg-secondary_dark"
                                    onBlur={onInputBlur}
                                    readOnly={!!data}
                                />
                                {word && wordInfoPending && (
                                    <Loader className="absolute top-1/2 right-2 z-10" />
                                )}
                            </div>

                            <FormTagsInput
                                control={control}
                                name="translations"
                                label={tForm("translations")}
                                className="bg-secondary_dark"
                                suggestedValues={wordInfo?.translations}
                            />
                            <FormTagsInput
                                control={control}
                                name="definitions"
                                label={tForm("definitions")}
                                className="bg-secondary_dark"
                                suggestedValues={wordInfo?.definitions}
                            />
                        </>
                    );
                }}
            />
        </div>
    );
};

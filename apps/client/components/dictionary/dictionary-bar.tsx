"use client";

import { useTranslations } from "next-intl";
import { ChangeEvent, FC } from "react";

import { Button } from "@repo/ui/core/button";
import { Input } from "@repo/ui/core/input";

import { useModal } from "@repo/common/hooks/use-modal.tsx";

import { WordModal } from "./word-modal";

interface Props {
    search: string;
    searchChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const DictionaryBar: FC<Props> = ({ search, searchChange }) => {
    const tForm = useTranslations("form");
    const t = useTranslations("dictionary");

    const { Modal, openModal, closeModal } = useModal();

    const onAddButtonClick = () => openModal(<WordModal closeModal={closeModal} />);

    return (
        <>
            <div className="flex items-center justify-between gap-6 sm:flex-col">
                <div className="w-sm sm:w-full">
                    <Input
                        placeholder={tForm("search")}
                        type="text"
                        value={search}
                        onChange={searchChange}
                    />
                </div>

                <Button
                    type="button"
                    variant="SUCCESS"
                    buttonClassName="w-default! sm:w-full!"
                    onClick={onAddButtonClick}
                >
                    +&nbsp;{t("add_word")}
                </Button>
            </div>

            <Modal />
        </>
    );
};

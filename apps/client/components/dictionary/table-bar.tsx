"use client";

import { useTranslations } from "next-intl";
import { ChangeEvent, FC, useState } from "react";

import { Button } from "@repo/ui/core/button";
import { Input } from "@repo/ui/core/input";

import { DEBOUNCE_DELAY } from "@repo/common/constants/common";
import useDebounce from "@repo/common/hooks/use-debounce.ts";

export const TableBar: FC = () => {
    const tForm = useTranslations("form");
    const t = useTranslations("dictionary");

    const [search, setSearch] = useState("");

    const debouncedSearch = useDebounce(search, DEBOUNCE_DELAY);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

    const onAddButtonClick = () => {
        // TODO: handle modal opening
    };

    return (
        <div className="flex items-center justify-between gap-6 sm:flex-col">
            <div className="w-sm sm:w-full">
                <Input
                    placeholder={tForm("search")}
                    type="text"
                    value={search}
                    onChange={onInputChange}
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
    );
};

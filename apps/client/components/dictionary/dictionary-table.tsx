"use client";

import { FC } from "react";

import { EmptyContent } from "@repo/ui/components/empty-content";

import { Word } from "@repo/common/types/dictionary";

interface Props {
    dictionary: Word[];
}

export const DictionaryTable: FC<Props> = ({ dictionary }) => {
    return (
        <div className="bg-secondary_dark/80 relative container flex w-full flex-1 flex-col rounded-lg p-6 md:p-4">
            {dictionary.length === 0 ? <EmptyContent /> : <div></div>}
        </div>
    );
};

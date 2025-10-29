"use client";

import { FC } from "react";

import { Meteors } from "@repo/ui/core/meteors";

import useWindowDimensions from "@repo/common/hooks/use-window-dimensions.ts";

import { DictionaryTable } from "../dictionary/dictionary-table";
import { TableBar } from "../dictionary/table-bar";

export const DictionaryPage: FC = () => {
    const { isMd } = useWindowDimensions();

    return (
        <section className="relative flex flex-1 flex-col overflow-hidden py-10 md:py-6">
            <Meteors number={10} containerWidth={isMd ? 800 : 2500} />

            <div className="relative container flex w-full flex-1 flex-col gap-6 md:gap-4">
                <TableBar />
                <div className="bg-secondary_dark/80 relative container flex w-full flex-1 flex-col rounded-lg p-6 md:p-4">
                    <DictionaryTable />
                </div>
            </div>
        </section>
    );
};

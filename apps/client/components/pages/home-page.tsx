import { FC } from "react";

import { PageTitle } from "@repo/ui/core/typography";

export const HomePage: FC = () => {
    return (
        <section className="relative flex h-full w-full flex-1 flex-col items-center justify-center overflow-hidden">
            <PageTitle>Let&apos;s play words!</PageTitle>
        </section>
    );
};

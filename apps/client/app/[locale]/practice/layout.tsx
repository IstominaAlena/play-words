import { FC, PropsWithChildren } from "react";

const PracticeLayout: FC<PropsWithChildren> = ({ children }) => (
    <section className="relative flex flex-1 flex-col overflow-hidden py-10 md:py-6">
        <div className="relative container flex w-full flex-1 flex-col gap-6 md:gap-4">
            <div className="bg-secondary_bg/80 flex w-full flex-1 gap-6 rounded-lg p-6">
                {children}
            </div>
        </div>
    </section>
);

export default PracticeLayout;

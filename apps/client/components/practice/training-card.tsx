import { useTranslations } from "next-intl";
import { FC, useMemo, useState } from "react";

import { Button } from "@repo/ui/core/button";
import { Slider } from "@repo/ui/core/slider";
import { Title } from "@repo/ui/core/typography";

import { useRouter } from "@repo/i18n/config/navigation";

interface Props {
    href: string;
    title: string;
    hasOptions?: boolean;
}

const options = ["word_translations", "translations_word", "word_definitions", "definitions_word"];

export const TrainingCard: FC<Props> = ({ href, title, hasOptions }) => {
    const t = useTranslations("practice");

    const [option, setOption] = useState(options[0]);

    const router = useRouter();

    const mappedOptions = useMemo(() => options.map((item) => t(item)), [t]);

    const onSlideChange = (activeIndex: number) => {
        const activeOption = options[activeIndex];
        setOption(activeOption);
    };

    const onButtonClick = () => {
        const query = hasOptions ? `?option=${option}` : "";

        router.push(`${href}${query}`);
    };

    return (
        <div className="border-neutral flex h-full w-full flex-col items-center justify-between gap-4 rounded-lg border p-4">
            <Title>{t(title)}</Title>
            {hasOptions && (
                <Slider id={title} slides={mappedOptions} onSlideChange={onSlideChange} />
            )}
            <Button
                variant="SUCCESS"
                className="bg-secondary_bg"
                buttonClassName="max-w-default w-full"
                onClick={onButtonClick}
            >
                {t("go")}
            </Button>
        </div>
    );
};

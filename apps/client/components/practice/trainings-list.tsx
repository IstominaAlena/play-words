"use client";

import { useTranslations } from "next-intl";
import { FC } from "react";

import { Title } from "@repo/ui/core/typography";

import { PracticeRoutes } from "@/enums/routes";

import { TrainingCard } from "./training-card";

interface TrainingCard {
    href: string;
    title: string;
    hasOptions?: boolean;
}

const trainings = [
    { href: PracticeRoutes.QUIZ, title: "flip_cards", hasOptions: true },
    { href: PracticeRoutes.QUIZ, title: "quiz", hasOptions: true },
];

export const TrainingsList: FC = () => {
    const t = useTranslations("practice");

    const renderTrainingCard = ({ href, title, hasOptions }: TrainingCard) => (
        <li className="h-42 flex-1" key={title}>
            <TrainingCard title={title} href={href} hasOptions={hasOptions} />
        </li>
    );

    return (
        <div className="flex flex-1 flex-col gap-4">
            <Title>{t("trainings")}</Title>
            <ul className="flex flex-1 gap-4">{trainings.map(renderTrainingCard)}</ul>
        </div>
    );
};

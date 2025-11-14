"use client";

import { useSearchParams } from "next/navigation";
import { FC, useMemo, useState } from "react";

import { GlowingContainer } from "@repo/ui/core/glowing-container";
import { Loader } from "@repo/ui/core/loader";
import { Stepper } from "@repo/ui/core/stepper";
import { Title } from "@repo/ui/core/typography";

import { useUserStore } from "@repo/common/stores/user-store";
import { Word } from "@repo/common/types/dictionary";

import { useWordsForPractice } from "@/api/practice/queries";

interface Variant {
    id: number;
    variant: string[] | string | number;
}

export const QuizPage: FC = () => {
    const { practiceWordsIds, settings } = useUserStore();

    const searchParams = useSearchParams();

    const option = searchParams.get("option") ?? "word_translation";

    const [rawQuestion = "word", rawAnswer = "translation"] = option.split("_");

    const question = rawQuestion as keyof Word;
    const answer = rawAnswer as keyof Word;

    const { data: words, isPending } = useWordsForPractice(practiceWordsIds);

    const shuffledWords = useMemo(
        () => [...(words ?? [])].sort(() => Math.random() - 0.5),
        [words],
    );

    const [currentWordIdx, setCurrentWordIdx] = useState(0);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [showLoader, setShowLoader] = useState(false);

    const currentWord = shuffledWords[currentWordIdx];

    const variants = useMemo(() => {
        if (!currentWord) return [];
        return [
            { id: currentWord.wordId, variant: currentWord[answer] },
            ...shuffledWords
                .filter((item) => item.wordId !== currentWord.wordId)
                .slice(0, 3)
                .map((item) => ({ id: item.wordId, variant: item[answer] })),
        ];
    }, [answer, currentWord, shuffledWords]);

    const shuffledVariants = useMemo(() => {
        return [...variants].sort(() => Math.random() - 0.5);
    }, [variants]);

    const onVariantClick = (id: number) => {
        if (selectedId !== null || showLoader) return;

        setSelectedId(id);

        setTimeout(() => {
            setShowLoader(true);
            setTimeout(() => {
                setShowLoader(false);
                setSelectedId(null);
                setCurrentWordIdx((prev) => (prev + 1 <= shuffledWords.length ? prev + 1 : 0));
            }, 1000);
        }, 2000);
    };

    const renderVariant = ({ id, variant }: Variant) => {
        const isSelected = selectedId === id;
        const isCorrect = id === currentWord?.wordId;

        const variantStatus = selectedId
            ? isCorrect
                ? "SUCCESS"
                : isSelected
                  ? "ERROR"
                  : "NEUTRAL"
            : "NEUTRAL";

        return (
            <li key={id} onClick={() => onVariantClick(id)}>
                <GlowingContainer
                    contentClassName="bg-secondary_bg"
                    containerClassName="rounded-lg cursor-pointer"
                    variant={variantStatus}
                >
                    {typeof variant === "string" || typeof variant === "number"
                        ? variant
                        : variant.join(", ")}
                </GlowingContainer>
            </li>
        );
    };

    if (isPending || showLoader) {
        return (
            <div className="flex flex-1 items-center justify-center">
                <Loader size={100} />
            </div>
        );
    }

    return (
        <div className="flex flex-1 flex-col gap-6">
            <Stepper steps={settings?.wordsPerTraining ?? 0} currentStep={currentWordIdx} />
            <div className="flex flex-1 flex-col items-center justify-center gap-6">
                <div className="border-neutral flex h-40 w-full max-w-sm items-center justify-center rounded-lg border">
                    <Title>
                        {typeof currentWord?.[question] === "string" ||
                        typeof currentWord?.[question] === "number"
                            ? currentWord?.[question]
                            : currentWord?.[question].join(", ")}
                    </Title>
                </div>
                <ul className="grid w-full max-w-xl grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                    {shuffledVariants.map(renderVariant)}
                </ul>
            </div>
        </div>
    );
};

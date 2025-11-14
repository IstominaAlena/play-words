import { FC } from "react";

import { TrainingsList } from "../practice/trainings-list";
import { WordsPicker } from "../practice/words-picker";

export const PracticePage: FC = () => {
    return (
        <>
            <WordsPicker />
            <div className="bg-vertical_neutral_gradient lg:bg-horizontal_neutral_gradient w-px lg:h-px lg:w-full" />
            <TrainingsList />
        </>
    );
};

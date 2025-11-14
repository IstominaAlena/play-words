import { useApiQuery } from "@repo/api-config/api-config";
import { Word } from "@repo/common/types/dictionary";

import { getWordsForPractice } from "./endpoints";

export const useWordsForPractice = (ids: number[]) => {
    return useApiQuery<Word[]>({
        retry: false,
        queryFn: () => getWordsForPractice(ids),
        queryKey: ["words-for-practice", ids],
        enabled: !!ids.length,
    });
};

import { api } from "@repo/api-config/api-config";
import { Dictionary, Word } from "@repo/common/types/dictionary";

export const getWordsForPractice = async (ids: number[]): Promise<Word[]> => {
    const { data } = await api.post<Dictionary>("/practice", ids);

    return data.data;
};

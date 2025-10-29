import { api } from "@repo/api-config/api-config";
import { PaginationDto } from "@repo/common/types/api";
import { CreateWordDto, Dictionary } from "@repo/common/types/dictionary";

export const getDictionary = async ({ limit, offset }: PaginationDto): Promise<Dictionary> => {
    const { data } = await api.get<Dictionary>(`/dictionary?limit=${limit}&offset=${offset}`);

    return data;
};

export const addWord = async (dto: CreateWordDto): Promise<void> => {
    await api.post("/dictionary/add", dto);
};

export const deleteWord = async (wordId: number): Promise<void> => {
    await api.delete(`/dictionary/delete?wordId=${wordId}`);
};

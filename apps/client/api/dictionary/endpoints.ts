import { api } from "@repo/api-config/api-config";
import { PaginationDto } from "@repo/common/types/api";
import { CreateWordDto, Dictionary, EditWordDto, WordInfo } from "@repo/common/types/dictionary";

export const getDictionary = async ({
    pageSize,
    page,
    search,
}: PaginationDto): Promise<Dictionary> => {
    const qs = search ? `&search=${search}` : "";

    const { data } = await api.get<Dictionary>(
        `/dictionary?pageSize=${pageSize}&page=${page}${qs}`,
    );

    return data;
};

export const addWord = async (dto: CreateWordDto): Promise<void> => {
    await api.post("/dictionary/add", dto);
};

export const editWord = async (dto: EditWordDto, wordId?: number): Promise<void> => {
    await api.patch(`/dictionary/edit?wordId=${wordId}`, dto);
};

export const deleteWord = async (wordId: number): Promise<void> => {
    await api.delete(`/dictionary/delete?wordId=${wordId}`);
};

export const getWordInfo = async (word: string): Promise<WordInfo> => {
    const { data } = await api.post<WordInfo>("/dictionary/word", { word });
    return data;
};

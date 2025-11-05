import { getDictionary } from "./ get-dictionary";
import { addWord } from "./add-word";
import { deleteWord } from "./delete-word";
import { editWord } from "./edit-word";
import { getWordInfo } from "./get-word-info";

export const dictionaryControllersService = {
    getDictionary,
    addWord,
    editWord,
    deleteWord,
    getWordInfo,
};

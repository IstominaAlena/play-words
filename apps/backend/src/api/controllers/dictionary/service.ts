import { getDictionary } from "./ get-dictionary";
import { addDemoWord } from "./add-demo-word";
import { addWord } from "./add-word";
import { deleteDemoWord } from "./delete-demo-word";
import { deleteWord } from "./delete-word";
import { editWord } from "./edit-word";
import { getDemoDictionary } from "./get-demo-dictionary";
import { getWordInfo } from "./get-word-info";

export const dictionaryControllersService = {
    getDictionary,
    addWord,
    editWord,
    deleteWord,
    getWordInfo,
    getDemoDictionary,
    addDemoWord,
    deleteDemoWord,
};

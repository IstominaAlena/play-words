import { DictionaryIcon } from "@repo/ui/icons/dictionary";
import { GamesIcon } from "@repo/ui/icons/games";
import { HomeIcon } from "@repo/ui/icons/home";
import { PracticeIcon } from "@repo/ui/icons/practice";

import { NavLink } from "@repo/common/types/common";

import { Routes } from "@/enums/routes";

const navLinkIcons = {
    home: HomeIcon,
    dictionary: DictionaryIcon,
    practice: PracticeIcon,
    games: GamesIcon,
};

export const navLinks: NavLink[] = Object.keys(Routes).map((key) => ({
    key: key.toLowerCase(),
    path: Routes[key as keyof typeof Routes],
    icon: navLinkIcons[key.toLowerCase() as keyof typeof navLinkIcons],
}));

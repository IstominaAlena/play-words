import { FC, SVGProps } from "react";

export interface NavLink {
    key: string;
    path: string;
    icon: FC<SVGProps<SVGSVGElement>>;
}

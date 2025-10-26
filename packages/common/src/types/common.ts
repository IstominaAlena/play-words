import { FC, SVGProps } from "react";

export interface NavLink {
    key: string;
    path: string;
    icon: FC<SVGProps<SVGSVGElement>>;
}

export type Variant = "SUCCESS" | "ERROR" | "WARN" | "NEUTRAL";

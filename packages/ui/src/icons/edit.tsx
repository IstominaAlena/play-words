import { FC, SVGProps } from "react";

export const EditIcon: FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg viewBox="0 0 32 32" fill="none" width={32} height={32} {...props}>
        <path
            d="M27 0c2.761 0 5 2.239 5 5 0 1.126-0.372 2.164-1 3l-2 2-7-7 2-2c0.836-0.628 1.874-1 3-1zM2 23l-2 9 9-2 18.5-18.5-7-7-18.5 18.5zM22.362 11.362l-14 14-1.724-1.724 14-14 1.724 1.724z"
            fill="currentColor"
        ></path>
    </svg>
);

import { FC } from "react";

import { Loader } from "../core/loader";
import { cn } from "../utils/class-names";

interface Props {
    screenProtector?: boolean;
}

export const LoaderScreen: FC<Props> = ({ screenProtector }) => (
    <div
        className={cn(
            "pointer-events-none fixed top-0 left-0 z-[100] flex h-screen w-full items-center justify-center",
            !screenProtector && "backdrop-blur-sm",
        )}
    >
        {!screenProtector && <Loader size={100} />}
    </div>
);

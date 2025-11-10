import * as LabelPrimitive from "@radix-ui/react-label";
import { ComponentProps, FC } from "react";

import { cn } from "../utils/class-names";

export const Label: FC<ComponentProps<typeof LabelPrimitive.Root>> = ({ className, ...props }) => (
    <LabelPrimitive.Root
        data-slot="label"
        className={cn("text-secondary_text text-sm capitalize", className)}
        {...props}
    />
);

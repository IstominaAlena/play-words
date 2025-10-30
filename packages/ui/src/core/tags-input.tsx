import * as TagsInputPrimitive from "@diceui/tags-input";
import { X } from "lucide-react";
import { ComponentProps, FC, FocusEventHandler, useState } from "react";

import { cn } from "../utils/class-names";
import { GlowingContainer } from "./glowing-container";

const CoreTagsInput: FC<ComponentProps<typeof TagsInputPrimitive.Root>> = ({
    className,
    ...props
}) => (
    <TagsInputPrimitive.Root
        data-slot="tags-input"
        className={cn("flex w-full flex-col gap-2", className)}
        {...props}
    />
);

const TagsInputList: FC<ComponentProps<"div">> = ({ className, ...props }) => (
    <div
        data-slot="tags-input-list"
        className={cn(
            "flex w-full flex-wrap items-center gap-1.5 rounded-[inherit] text-sm",
            className,
        )}
        {...props}
    />
);

const TagsInputInput: FC<ComponentProps<typeof TagsInputPrimitive.Input>> = ({
    className,
    ...props
}) => (
    <TagsInputPrimitive.Input
        data-slot="tags-input-input"
        className={cn(
            "placeholder:text-muted-foreground caret-accent_light h-10 w-full flex-1 bg-transparent px-5 py-2 outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className,
        )}
        {...props}
    />
);

const TagsInputItem: FC<ComponentProps<typeof TagsInputPrimitive.Item>> = ({
    className,
    children,
    ...props
}) => (
    <TagsInputPrimitive.Item
        data-slot="tags-input-item"
        className={cn(
            "data-editing:ring-ring [&[data-highlighted]:not([data-editing])]:bg-accent [&[data-highlighted]:not([data-editing])]:text-accent-foreground border-neutral text-primary_light inline-flex max-w-[calc(100%-8px)] items-center gap-1.5 rounded-lg border bg-transparent px-2.5 py-1 text-sm focus:outline-hidden data-disabled:cursor-not-allowed data-disabled:opacity-50 data-editable:select-none data-editing:bg-transparent data-editing:ring-1 [&:not([data-editing])]:pr-1.5",
            className,
        )}
        {...props}
    >
        <TagsInputPrimitive.ItemText className="">{children}</TagsInputPrimitive.ItemText>
        <TagsInputPrimitive.ItemDelete className="ring-offset-background size-4 shrink-0 rounded-sm opacity-70 transition-opacity hover:opacity-100">
            <X className="size-3.5" />
        </TagsInputPrimitive.ItemDelete>
    </TagsInputPrimitive.Item>
);

interface Props {
    placeholder?: string;
    values: string[];
    onValueChange: (newValues: string[]) => void;
    editable?: boolean;
    isError?: boolean;
    className?: string;
}

export const TagsInput: FC<Props> = ({
    placeholder,
    values,
    onValueChange,
    editable,
    isError,
    className,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    return (
        <CoreTagsInput
            value={values}
            onValueChange={onValueChange}
            editable={editable}
            addOnPaste
            onBlur={onBlur}
            onFocus={onFocus}
        >
            <GlowingContainer
                containerClassName="disabled:pointer-events-none disabled:opacity-50"
                contentClassName={cn("p-0", isFocused && "border-accent_dark", className)}
                glowClassName={cn(
                    "border border-transparent",
                    isFocused && "bg-accent_light_gradient border-accent_dark",
                    isError && "bg-error_gradient border-error_dark",
                )}
            >
                <TagsInputList>
                    {values.map((value) => (
                        <TagsInputItem key={value} value={value}>
                            {value}
                        </TagsInputItem>
                    ))}
                    {editable && <TagsInputInput placeholder={placeholder} />}
                </TagsInputList>
            </GlowingContainer>
        </CoreTagsInput>
    );
};

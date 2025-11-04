"use client";

import { useTranslations } from "next-intl";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { ErrorMessage } from "../core/error-message";
import { Label } from "../core/label";
import { TagsInput, TagsList } from "../core/tags-input";
import { cn } from "../utils/class-names";

interface FormTagsInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    className?: string;
    labelClassName?: string;
    errorClassName?: string;
    containerClassName?: string;
    readOnly?: boolean;
    suggestedValues?: string[];
}

export const FormTagsInput = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    className,
    labelClassName,
    errorClassName,
    containerClassName,
    readOnly,
    suggestedValues = [],
}: FormTagsInputProps<T>) => {
    const tForm = useTranslations("form");

    return (
        <div className={cn("relative flex w-full flex-col gap-1", containerClassName)}>
            {label && <Label className={labelClassName}>{label}</Label>}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => {
                    const currentValues: string[] = field.value ?? [];

                    const handleClick = (value: string) => {
                        if (!currentValues.includes(value)) {
                            field.onChange([...currentValues, value]);
                        }
                    };

                    return (
                        <div className="flex flex-col gap-4">
                            <div className="relative flex flex-col gap-4">
                                <TagsInput
                                    placeholder={placeholder}
                                    values={field.value ?? []}
                                    onValueChange={(newValues) => field.onChange(newValues)}
                                    editable={!readOnly}
                                    className={className}
                                    isError={!!error}
                                />

                                <ErrorMessage
                                    message={error?.message}
                                    className={cn("absolute top-full left-4 mt-px", errorClassName)}
                                />
                            </div>
                            <TagsList
                                triggerText={tForm("tips", { number: suggestedValues.length ?? 0 })}
                                values={suggestedValues}
                                itemClassName="text-neutral"
                                onValueClick={handleClick}
                                isDisabled={suggestedValues.length === 0}
                            />
                        </div>
                    );
                }}
            />
        </div>
    );
};

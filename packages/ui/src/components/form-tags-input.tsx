"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { ErrorMessage } from "../core/error-message";
import { Label } from "../core/label";
import { TagsInput } from "../core/tags-input";
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
}: FormTagsInputProps<T>) => (
    <div className={cn("relative flex w-full flex-col gap-1", containerClassName)}>
        {label && <Label className={labelClassName}>{label}</Label>}
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <>
                    <TagsInput
                        placeholder={placeholder}
                        values={field.value ?? []}
                        onValueChange={(newValues) => field.onChange(newValues)}
                        editable={!readOnly}
                        className={className}
                    />

                    <ErrorMessage
                        message={error?.message}
                        className={cn("absolute top-full left-4 mt-px", errorClassName)}
                    />
                </>
            )}
        />
    </div>
);

"use client";

import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { ErrorMessage } from "../core/error-message";
import { Input } from "../core/input";
import { Label } from "../core/label";
import { cn } from "../utils/class-names";

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    type?: string;
    className?: string;
    labelClassName?: string;
    errorClassName?: string;
    containerClassName?: string;
}

export const FormInput = <T extends FieldValues>({
    name,
    control,
    label,
    placeholder,
    type = "text",
    className,
    labelClassName,
    errorClassName,
    containerClassName,
}: FormInputProps<T>) => (
    <div className={cn("relative flex w-full flex-col gap-1", containerClassName)}>
        {label && <Label className={labelClassName}>{label}</Label>}
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <>
                    <Input
                        {...field}
                        id={name}
                        placeholder={placeholder}
                        type={type}
                        className={className}
                        isError={!!error}
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

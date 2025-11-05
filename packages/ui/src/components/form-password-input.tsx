"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { ErrorMessage } from "../core/error-message";
import { Input } from "../core/input";
import { Label } from "../core/label";
import { CloseEyeIcon } from "../icons/close-eye";
import { OpenEyeIcon } from "../icons/open-eye";
import { cn } from "../utils/class-names";

interface FormInputProps<T extends FieldValues> {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    type?: string;
    className?: string;
    labelClassName?: string;
    errorClassName?: string;
    containerClassName?: string;
}

export const FormPasswordInput = <T extends FieldValues>({
    name,
    control,
    label,
    className,
    labelClassName,
    errorClassName,
    containerClassName,
}: FormInputProps<T>) => {
    const tForm = useTranslations("form");

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePassword = () => setIsPasswordVisible((state) => !state);

    const Icon = isPasswordVisible ? CloseEyeIcon : OpenEyeIcon;
    return (
        <div className={cn("relative flex w-full flex-col gap-1", containerClassName)}>
            {label && <Label className={labelClassName}>{label}</Label>}
            <div className="relative flex w-full flex-col gap-1">
                <Controller
                    name={name}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                        <>
                            <Input
                                {...field}
                                id={name}
                                placeholder={tForm("password_placeholder")}
                                type={isPasswordVisible ? "text" : "password"}
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

                <Icon
                    width={20}
                    height={20}
                    className="text-neutral hover:text-secondary_text absolute end-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer"
                    onClick={togglePassword}
                />
            </div>
        </div>
    );
};

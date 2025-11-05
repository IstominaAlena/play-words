"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import { DefaultValues, FieldValues, SubmitHandler, UseFormReturn, useForm } from "react-hook-form";

import { Button } from "../core/button";
import { cn } from "../utils/class-names";

interface BaseFormProps<T extends FieldValues> {
    defaultValues?: DefaultValues<T>;
    onSubmit: SubmitHandler<T>;
    render: (methods: UseFormReturn<T>) => ReactNode;
    schema: any;
    className?: string;
    containerClassName?: string;
    isLoading?: boolean;
    submitButtonClassName?: string;
}

export const Form = <T extends FieldValues>({
    defaultValues,
    onSubmit,
    render,
    schema,
    className,
    containerClassName,
    isLoading,
    submitButtonClassName,
}: BaseFormProps<T>) => {
    const t = useTranslations("form");

    const methods = useForm<T>({
        defaultValues,
        resolver: zodResolver(schema),
        mode: "onChange",
    });

    return (
        <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={cn("flex w-full flex-col gap-6", className)}
        >
            <div className={cn("flex flex-col gap-4", containerClassName)}>{render(methods)}</div>
            <Button
                type="submit"
                variant="SUCCESS"
                disabled={!methods.formState.isValid}
                isLoading={isLoading}
                buttonClassName={submitButtonClassName}
                className="bg-secondary_bg"
            >
                {t("submit")}
            </Button>
        </form>
    );
};

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
}

export const Form = <T extends FieldValues>({
    defaultValues,
    onSubmit,
    render,
    schema,
    className,
    containerClassName,
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
            className={cn("flex w-full flex-col gap-4", className)}
        >
            <div className={cn("flex flex-col gap-4", containerClassName)}>{render(methods)}</div>
            <Button
                type="submit"
                disabled={!methods.formState.isValid}
                className="bg-secondary_dark"
            >
                {t("submit")}
            </Button>
        </form>
    );
};

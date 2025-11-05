"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "lucide-react";
import { ComponentProps, FC } from "react";

import { cn } from "../utils/class-names";

const Accordion: FC<ComponentProps<typeof AccordionPrimitive.Root>> = ({ ...props }) => (
    <AccordionPrimitive.Root data-slot="accordion" {...props} />
);

const AccordionItem: FC<ComponentProps<typeof AccordionPrimitive.Item>> = ({
    className,
    ...props
}) => (
    <AccordionPrimitive.Item
        data-slot="accordion-item"
        className={cn("border-b last:border-b-0", className)}
        {...props}
    />
);

const AccordionTrigger: FC<ComponentProps<typeof AccordionPrimitive.Trigger>> = ({
    className,
    children,
    ...props
}) => (
    <AccordionPrimitive.Header className="flex">
        <AccordionPrimitive.Trigger
            data-slot="accordion-trigger"
            className={cn(
                "text-secondary_light hover:text-primary_light flex flex-1 items-start justify-between gap-4 rounded-lg text-sm capitalize transition-all duration-300 outline-none disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180",
                className,
            )}
            {...props}
        >
            {children}
            <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-300" />
        </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
);

const AccordionContent: FC<ComponentProps<typeof AccordionPrimitive.Content>> = ({
    className,
    children,
    ...props
}) => (
    <AccordionPrimitive.Content
        data-slot="accordion-content"
        className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden p-2 text-sm"
        {...props}
    >
        <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
);

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

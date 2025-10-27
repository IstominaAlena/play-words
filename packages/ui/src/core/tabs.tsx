"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import { ComponentProps, FC, JSX } from "react";

import { cn } from "../utils/class-names";
import { GlowingContainer } from "./glowing-container";

const CoreTabs: FC<ComponentProps<typeof TabsPrimitive.Root>> = ({ className, ...props }) => (
    <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("flex w-full gap-6 md:flex-col", className)}
        {...props}
    />
);

const TabsList: FC<ComponentProps<typeof TabsPrimitive.List>> = ({ className, ...props }) => (
    <TabsPrimitive.List
        data-slot="tabs-list"
        className={cn(
            "max-w-default flex h-fit w-full flex-col items-center justify-center gap-4 md:max-w-full md:flex-row",
            className,
        )}
        {...props}
    />
);

const TabsTrigger: FC<ComponentProps<typeof TabsPrimitive.Trigger>> = ({ className, ...props }) => (
    <TabsPrimitive.Trigger
        data-slot="tabs-trigger"
        className={cn("group h-10 w-full", className)}
        {...props}
    />
);

const TabsContent: FC<ComponentProps<typeof TabsPrimitive.Content>> = ({ className, ...props }) => (
    <TabsPrimitive.Content
        data-slot="tabs-content"
        className={cn("bg-secondary_dark/80 z-20 w-full flex-3 rounded-lg p-6", className)}
        {...props}
    />
);

interface Tab {
    name: string;
    content: JSX.Element;
}

interface Props {
    tabs: Tab[];
    className?: string;
    listClassName?: string;
    contentClassName?: string;
    tabClassName?: string;
}

export const Tabs: FC<Props> = ({
    tabs,
    className,
    listClassName,
    contentClassName,
    tabClassName,
}) => {
    const renderTabTrigger = ({ name }: Tab) => (
        <TabsTrigger value={name} className={cn("flex-1", tabClassName)} key={name}>
            <GlowingContainer
                containerClassName="rounded-lg"
                glowClassName="group-data-[state=active]:bg-accent_dark"
                contentClassName="group-data-[state=active]:text-accent_light text-secondary_light"
            >
                {name}
            </GlowingContainer>
        </TabsTrigger>
    );

    const renderTabItem = ({ name, content }: Tab) => (
        <TabsContent value={name} key={name} className={contentClassName}>
            {content}
        </TabsContent>
    );

    const defaultTab = tabs[0]?.name ?? "";

    return (
        <CoreTabs defaultValue={defaultTab} className={className}>
            <TabsList className={listClassName}>{tabs.map(renderTabTrigger)}</TabsList>

            {tabs.map(renderTabItem)}
        </CoreTabs>
    );
};

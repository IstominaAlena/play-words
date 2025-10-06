"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { ComponentProps, FC, JSX, PropsWithChildren } from "react";

import { cn } from "../utils/class-names";

const CoreDropdownMenu: FC<ComponentProps<typeof DropdownMenuPrimitive.Root>> = ({ ...props }) => (
    <DropdownMenuPrimitive.Root data-slot="dropdown-menu" {...props} />
);

const DropdownMenuTrigger: FC<ComponentProps<typeof DropdownMenuPrimitive.Trigger>> = ({
    ...props
}) => <DropdownMenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;

const DropdownMenuContent: FC<ComponentProps<typeof DropdownMenuPrimitive.Content>> = ({
    className,
    sideOffset = 14,
    ...props
}) => (
    <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
            data-slot="dropdown-menu-content"
            sideOffset={sideOffset}
            className={cn(
                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-secondary_dark z-50 m-1 max-h-(--radix-dropdown-menu-content-available-height) min-w-[15rem] origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-lg",
                className,
            )}
            {...props}
        />
    </DropdownMenuPrimitive.Portal>
);

interface DropdownMenuItemProps {
    inset?: boolean;
    variant?: "default" | "destructive";
}

export const DropdownMenuItem: FC<
    ComponentProps<typeof DropdownMenuPrimitive.Item> & DropdownMenuItemProps
> = ({ className, inset, variant = "default", ...props }) => (
    <DropdownMenuPrimitive.Item
        data-slot="dropdown-menu-item"
        data-inset={inset}
        data-variant={variant}
        className={cn(className)}
        {...props}
    />
);

interface DropdownMenuProps extends PropsWithChildren {
    trigger: JSX.Element;
    content: JSX.Element[];
    triggerClassName?: string;
    contentClassName?: string;
    itemClassName?: string;
}

export const DropdownMenu: FC<DropdownMenuProps> = ({
    children,
    trigger,
    content,
    triggerClassName,
    contentClassName,
    itemClassName,
}) => {
    const renderContentItem = (content: JSX.Element, index: number) => (
        <DropdownMenuItem key={index} className={itemClassName}>
            {content}
        </DropdownMenuItem>
    );

    return (
        <CoreDropdownMenu>
            <DropdownMenuTrigger asChild className={triggerClassName}>
                {trigger}
            </DropdownMenuTrigger>
            <DropdownMenuContent className={contentClassName} side={"bottom"}>
                {content.map(renderContentItem)}

                {children}
            </DropdownMenuContent>
        </CoreDropdownMenu>
    );
};

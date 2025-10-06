"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { XIcon } from "lucide-react";
import { ComponentProps, FC, PropsWithChildren } from "react";

import { cn } from "../utils/class-names";
import { Meteors } from "./meteors";

const CoreDialog: FC<ComponentProps<typeof DialogPrimitive.Root>> = ({ ...props }) => (
    <DialogPrimitive.Root data-slot="dialog" {...props} />
);

const DialogPortal: FC<ComponentProps<typeof DialogPrimitive.Portal>> = ({ ...props }) => (
    <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
);

const DialogOverlay: FC<ComponentProps<typeof DialogPrimitive.Overlay>> = ({
    className,
    ...props
}) => (
    <DialogPrimitive.Overlay
        data-slot="dialog-overlay"
        className={cn(
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/20 backdrop-blur-sm",
            className,
        )}
        {...props}
    />
);

const DialogContent: FC<
    ComponentProps<typeof DialogPrimitive.Content> & {
        showCloseButton?: boolean;
    }
> = ({ className, children, showCloseButton = true, ...props }) => {
    return (
        <DialogPortal data-slot="dialog-portal">
            <DialogOverlay />
            <DialogPrimitive.Content
                data-slot="dialog-content"
                className={cn(
                    "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 bg-secondary_dark fixed top-[50%] left-[50%] z-50 w-full max-w-[30rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg p-6 shadow-lg md:max-w-[calc(100%-1rem)]",
                    className,
                )}
                {...props}
            >
                {children}
                {showCloseButton && (
                    <DialogPrimitive.Close
                        data-slot="dialog-close"
                        className="text-secondary_light hover:text-primary_light absolute top-4 right-4 cursor-pointer"
                    >
                        <XIcon width={16} height={16} />
                        <span className="sr-only">Close</span>
                    </DialogPrimitive.Close>
                )}
            </DialogPrimitive.Content>
        </DialogPortal>
    );
};

const DialogHeader: FC<ComponentProps<"div">> = ({ className, ...props }) => (
    <div
        data-slot="dialog-header"
        className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
        {...props}
    />
);

const DialogTitle: FC<ComponentProps<typeof DialogPrimitive.Title>> = ({ className, ...props }) => (
    <DialogPrimitive.Title
        data-slot="dialog-title"
        className={cn("text-lg leading-none font-semibold", className)}
        {...props}
    />
);

interface DialogDemoProps extends PropsWithChildren {
    isOpen: boolean;
    onOpenChange: () => void;
    contentClassName?: string;
}

export const Dialog: FC<DialogDemoProps> = ({
    children,
    isOpen,
    onOpenChange,
    contentClassName,
}) => {
    return (
        <CoreDialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className={contentClassName}>
                <DialogHeader className="hidden">
                    <DialogTitle>Dialog</DialogTitle>
                </DialogHeader>
                {children}
                <Meteors number={10} />
            </DialogContent>
        </CoreDialog>
    );
};

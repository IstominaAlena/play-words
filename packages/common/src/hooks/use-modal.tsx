"use client";

import { FC, ReactNode, useCallback, useState } from "react";

import { Dialog } from "@repo/ui/core/dialog";

interface ModalProps {
    contentClassName?: string;
}

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [modalContent, setModalContent] = useState<ReactNode>(null);

    const openModal = useCallback((content: ReactNode) => {
        setModalContent(content);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setModalContent(null);
    }, []);

    const Modal: FC<ModalProps> = useCallback(
        ({ contentClassName }) => (
            <Dialog isOpen={isOpen} onOpenChange={closeModal} contentClassName={contentClassName}>
                {modalContent}
            </Dialog>
        ),
        [isOpen, modalContent, closeModal],
    );

    return { openModal, closeModal, Modal };
};

import {
    FloatingFocusManager,
    FloatingOverlay,
    FloatingPortal,
    useClick,
    useDismiss,
    useFloating,
    useInteractions,
    useRole
} from "@floating-ui/react";
import React, { useMemo } from "react";
import useWindowSize from "../../lib/hooks/useWindowSize";

interface ModalComponentProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
    isFullScreen?: boolean;
}

function Modal({ isOpen, onClose, onOpen, isFullScreen, children }: ModalComponentProps) {
    const { refs, context } = useFloating({
        open: isOpen,
        onOpenChange: isOpen ? onClose : onOpen
    });

    const click = useClick(context);
    const role = useRole(context);
    const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });

    const { getFloatingProps } = useInteractions([click, role, dismiss]);

    const { height } = useWindowSize();
    const dynamicContentStyles = useMemo(() => {
        if (isFullScreen)
            return {
                height,
                width: "100%"
            };

        return {
            borderRadius: "8px"
        };
    }, [isFullScreen, height]);

    if (!isOpen) return null;

    return (
        <FloatingPortal>
            <FloatingOverlay
                className="bg-gray-450 z-[20] grid place-items-center bg-opacity-50 backdrop-blur-sm"
                lockScroll
            >
                <FloatingFocusManager context={context} modal>
                    <div
                        className={`z-[2] min-w-[300px] overflow-auto bg-gray-900`}
                        style={dynamicContentStyles}
                        ref={refs.setFloating}
                        {...getFloatingProps()}
                    >
                        {children}
                    </div>
                </FloatingFocusManager>
            </FloatingOverlay>
        </FloatingPortal>
    );
}

export default Modal;

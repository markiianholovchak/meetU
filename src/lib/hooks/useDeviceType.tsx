import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { determineDeviceTypeByUserAgent } from "../helpers";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useDeviceType(isFirstRenderMobile = true) {
    const [isDesktop, setIsDesktop] = useState(!isFirstRenderMobile);
    const [isMobile, setIsMobile] = useState(false);

    const updateIsDesktop = useCallback((e: MediaQueryListEvent) => {
        if (e.matches) {
            setIsDesktop(true);
        } else {
            setIsDesktop(false);
        }
    }, []);

    const updateIsMobile = useCallback((e: MediaQueryListEvent) => {
        if (e.matches) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }, []);

    useIsomorphicLayoutEffect(() => {
        const desktopMedia = window.matchMedia(`(min-width: 1024px)`);
        const mobileMedia = window.matchMedia(`(max-width: 640px)`);
        desktopMedia.addEventListener("change", updateIsDesktop);
        mobileMedia.addEventListener("change", updateIsMobile);

        const { isMobile } = determineDeviceTypeByUserAgent();

        // Check on mount (callback is not called until a change occurs)
        if (desktopMedia.matches) {
            setIsDesktop(true);
        }

        if (isMobile || mobileMedia.matches) {
            setIsMobile(true);
        }

        return () => {
            desktopMedia.removeEventListener("change", updateIsDesktop);
            mobileMedia.removeEventListener("change", updateIsMobile);
        };
    }, []);

    return { isMobile, isDesktop };
}

export default useDeviceType;

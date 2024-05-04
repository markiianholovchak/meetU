import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const [isSmallScreen, setIsSmallScreen] = useState(
        typeof window !== "undefined" && window.innerWidth <= 640
    );

    const handleSize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight
        });
        setIsSmallScreen(window.innerWidth <= 640);
    };

    useLayoutEffect(() => {
        handleSize();

        window.addEventListener("resize", handleSize);

        return () => window.removeEventListener("resize", handleSize);
    }, []);

    return { ...windowSize, isSmallScreen };
};

export default useWindowSize;

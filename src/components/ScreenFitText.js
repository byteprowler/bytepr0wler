import React, { useCallback, useEffect, useRef } from "react";

export default function ScreenFitText({children}) {
    const containerRef = useRef(null)
    const textRef = useRef(null)

    const resizeText = useCallback(() => {
        const container = containerRef.current;
        const text = textRef.current;

        if (!container || !text) {
            return;
        }

        const containerWidth = container.offsetWidth;
        let min = 1;
        let max = 2500;

        while (min <= max ) {
            const mid = Math.floor((min + max) / 2)
            text.style.fontSize = mid + "px";

            if (text.offsetWidth <= containerWidth) {
                min = mid + 1;
            } else {
                max = mid -1;
            }
        }
    }, []);

    useEffect(() => {
        resizeText();

        window.addEventListener("resize", resizeText);

        return () => {
            window.removeEventListener("resize", resizeText)
        }
    }, [resizeText]);
  return (
    <div
    className='flex h-screen w-full items-center overflow-hidden'
    ref={containerRef}>
        <span className='absolute bottom-0 left-0 mx-auto whitespace-nowrap text-center font-bold uppercase text-slate-700'
        ref={textRef}>
        {children}
        </span>
    </div>
  )
}

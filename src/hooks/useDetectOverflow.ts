import { RefObject, useEffect, useState } from 'react';

export const useDetectOverflow = (ref: RefObject<HTMLElement>) => {
    const [overflow, setOverflow] = useState(false);

    useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                const hasHorizontalOverflow = entry.target.scrollWidth > entry.target.clientWidth;
                const hasVerticalOverflow = entry.target.scrollHeight > entry.target.clientHeight;
                setOverflow(hasHorizontalOverflow || hasVerticalOverflow);
            });
        });

        if (ref.current) observer.observe(ref.current);

        return () => observer.disconnect();
    }, []);

    return overflow;
};

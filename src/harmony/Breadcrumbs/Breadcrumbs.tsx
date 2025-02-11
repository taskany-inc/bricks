import React, { Children, useCallback, useMemo, useRef, useState } from 'react';
import cn from 'classnames';

import { Tooltip } from '../Tooltip/Tooltip';
import { useDetectOverflow, useResizeObserver } from '../../hooks';
import { nullable } from '../../utils';

import s from './Breadcrumbs.module.css';

const Separator = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={s.BreadcrumbSeparator}
    >
        <path d="M10 17.2L15.6 12L10 6.8" stroke="#89858D" strokeLinecap="square" />
    </svg>
);

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Breadcrumbs = ({ className, children, ...rest }: BreadcrumbsProps) => {
    const [hideCount, setHideCount] = useState(0);
    const breadcrumbCount = useRef(0);

    const hiddenRef = useRef<HTMLSpanElement>(null);

    const containerRef = useResizeObserver(
        useCallback((entry: ResizeObserverEntry) => {
            const breadcrumbPlusSeparatorWidth = 30 + 24;
            const containerWidth = entry.target.clientWidth;
            const minAllowedWidth = breadcrumbCount.current * breadcrumbPlusSeparatorWidth;

            if (containerWidth < minAllowedWidth) {
                const hideCount =
                    breadcrumbCount.current - Math.floor(containerWidth / breadcrumbPlusSeparatorWidth) + 1;
                setHideCount(hideCount);
            } else {
                setHideCount(0);
            }
        }, []),
    );

    const { first, hidden, middle, last } = useMemo(() => {
        const childrenArray = Children.toArray(children);
        breadcrumbCount.current = childrenArray.length;
        return {
            first: childrenArray[0],
            hidden: childrenArray.slice(1, 1 + hideCount),
            middle: childrenArray.slice(1 + hideCount, -1),
            last: childrenArray.length > 1 ? childrenArray.at(-1) : null,
        };
    }, [children, hideCount]);

    return (
        <div className={cn(s.Breadcrumbs, className)} ref={containerRef} {...rest}>
            {first}
            {nullable(hidden, () => (
                <>
                    <span className={s.Breadcrumb} ref={hiddenRef}>
                        ...
                    </span>
                    <Separator />
                </>
            ))}
            {middle}
            {last}
            {nullable(hidden, (h) => (
                <Tooltip reference={hiddenRef} placement="bottom-start">
                    {h.map((c, i) => (
                        <div key={i} className={s.BreadcrumbListItem}>
                            <Separator />
                            {c}
                        </div>
                    ))}
                </Tooltip>
            ))}
        </div>
    );
};

interface BreadcrumbProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Breadcrumb = ({ className, ...rest }: BreadcrumbProps) => {
    const ref = useRef(null);
    const overflow = useDetectOverflow(ref);

    return (
        <>
            <span className={cn(s.Breadcrumb, className)} ref={ref} {...rest} />
            {nullable(overflow, () => (
                <Tooltip reference={ref} placement="bottom-start">
                    <span {...rest} />
                </Tooltip>
            ))}
            <Separator />
        </>
    );
};

import React, { Children, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IconRightOutline } from '@taskany/icons';
import cn from 'classnames';

import { Tooltip } from '../Tooltip/Tooltip';
import { useDetectOverflow, useResizeObserver } from '../../hooks';
import { nullable } from '../../utils';
import { Popup } from '../Popup/Popup';

import s from './Breadcrumbs.module.css';

const separatorWidth = 24;
const ellipsisWidth = 30;

interface BreadcrumbsProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Breadcrumbs = ({ className, children, ...rest }: BreadcrumbsProps) => {
    const [hideCount, setHideCount] = useState(0);
    const breadcrumbCount = useRef(0);

    const [showHiddenPopup, setShowHiddenPopup] = useState(false);

    const hiddenRef = useRef<HTMLSpanElement>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    const lastContainerWidth = useRef(0);

    const checkHiding = useCallback(() => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.clientWidth;
        if (lastContainerWidth.current === containerWidth) return;
        lastContainerWidth.current = containerWidth;

        const children = Array.from(containerRef.current.children);
        const childrenWidths: number[] = [];
        children.forEach((c, i) => {
            if (i % 2 === 1) return; // skip separator
            const minWidth = Math.min(100, c.scrollWidth);
            if (minWidth) (c as HTMLElement).style.minWidth = `${minWidth}px`;
            childrenWidths.push(c.clientWidth);
        });
        const childrenWidthsSum =
            childrenWidths.reduce((prev, curr) => prev + curr) + childrenWidths.length * separatorWidth;
        if (childrenWidthsSum > containerWidth) {
            let hide = 1;
            let newSum = childrenWidthsSum + ellipsisWidth + separatorWidth;
            while (newSum > containerWidth) {
                newSum -= childrenWidths[hide];
                hide += 1;
            }
            setHideCount(hide + 1);
        } else {
            setHideCount(0);
        }
    }, []);

    useEffect(checkHiding, []);

    useResizeObserver(containerRef, checkHiding);

    const { first, hidden, middle, last } = useMemo(() => {
        const childrenArray = Children.toArray(children);
        breadcrumbCount.current = childrenArray.length;
        const first = childrenArray.shift();
        const last = childrenArray.pop();
        const hidden = childrenArray.slice(0, hideCount + 1);
        const middle = childrenArray.slice(hideCount + 1);
        return { first, hidden, middle, last };
    }, [children, hideCount]);

    return (
        <div className={cn(s.Breadcrumbs, className)} ref={containerRef} {...rest}>
            {first}
            {nullable(hidden, () => (
                <>
                    <span
                        className={cn(s.Breadcrumb, s.BreadcrumbEllipsis)}
                        onClick={() => setShowHiddenPopup((v) => !v)}
                        ref={hiddenRef}
                    >
                        ...
                    </span>
                    <IconRightOutline size="s" className={s.BreadcrumbSeparator} />
                </>
            ))}
            {middle}
            {last}
            {nullable(showHiddenPopup && hidden, (h) => (
                <Popup
                    visible
                    reference={hiddenRef}
                    placement="bottom-start"
                    interactive
                    onClickOutside={() => setShowHiddenPopup(false)}
                    className={s.BreadcrumbsHiddenItemsPopup}
                >
                    {h.map((c, i) => (
                        <div key={i} className={s.BreadcrumbListItem}>
                            <IconRightOutline size="s" className={s.BreadcrumbSeparator} />
                            {c}
                        </div>
                    ))}
                </Popup>
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
            <IconRightOutline size="s" className={s.BreadcrumbSeparator} />
        </>
    );
};

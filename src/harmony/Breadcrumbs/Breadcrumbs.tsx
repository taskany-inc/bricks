import React, { Children, useCallback, useMemo, useRef, useState } from 'react';
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

    const childrenWidths = useRef<number[]>([]);

    const lastContainerWidth = useRef(0);

    const checkHiding = useCallback((force?: boolean) => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.clientWidth;
        if (!force && lastContainerWidth.current === containerWidth) return;
        lastContainerWidth.current = containerWidth;
        const childrenWidthsSum =
            childrenWidths.current.reduce((prev, curr) => prev + curr, 0) +
            (childrenWidths.current.length - 1) * separatorWidth;
        if (childrenWidthsSum > containerWidth) {
            let hide = 0;
            let newSum = childrenWidthsSum + ellipsisWidth + separatorWidth;
            for (let i = childrenWidths.current.length - 1; i >= 0; i--) {
                if (newSum > containerWidth) {
                    newSum = newSum - childrenWidths.current[i] - separatorWidth;
                    hide += 1;
                }
            }
            setHideCount(hide);
        } else {
            setHideCount(0);
        }
    }, []);

    const measureChildren = useCallback(
        (el: HTMLDivElement | null) => {
            if (!el) return;
            const result: number[] = [];
            const children = Array.from(el.children);
            children.forEach((c, i) => {
                if (i % 2 === 1) return; // skip separator
                const minWidth = Math.min(100, c.scrollWidth);
                result.push(minWidth);
            });
            childrenWidths.current = result;
            checkHiding(true);
        },
        [children, checkHiding],
    );

    useResizeObserver(containerRef, () => checkHiding());

    const { first, hidden, last } = useMemo(() => {
        const childrenArray = Children.toArray(children);
        breadcrumbCount.current = childrenArray.length;
        const first = childrenArray.shift();
        const hidden = childrenArray.slice(0, hideCount);
        const last = childrenArray.slice(hideCount);
        return { first, hidden, last };
    }, [children, hideCount]);

    return (
        <div className={className} {...rest}>
            <div className={s.BreadcrumbsMeasuringWrapper} ref={measureChildren}>
                {children}
            </div>

            <div className={s.Breadcrumbs} ref={containerRef}>
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
                {last}
            </div>

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

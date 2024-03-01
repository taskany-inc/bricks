import React, { useEffect, useRef } from 'react';
import classNames from 'classnames';

import { nullable } from '../../utils';
import { Text } from '../Text/Text';

import classes from './FlatProgressBar.module.css';

interface FlatProgrssBarProps {
    /** value between 0 to 100 */
    value: number;
    /** `pill`: rounded corners, `default`: right corners */
    view?: 'pill' | 'default';
    showValue?: boolean;
    className?: string;
}

export const FlatProgressBar: React.FC<FlatProgrssBarProps> = ({
    value,
    className,
    showValue = true,
    view = 'pill',
}) => {
    const barRef = useRef<HTMLSpanElement>(null);
    const strokeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (barRef.current == null) {
            return;
        }

        if (strokeRef.current) {
            const { offsetWidth } = barRef.current;

            let width = offsetWidth * (Math.round(value) / 100);
            if (width > offsetWidth) {
                width = offsetWidth;
            }

            strokeRef.current.style.width = `${width}px`;
        }
    }, [value]);

    return (
        <div
            className={classNames(
                classes.FlatProgressBar,
                { [classes.FlatProgressBarPill]: view === 'pill' },
                className,
            )}
        >
            <span className={classes.FlatProgressBarStrokeWrapper} ref={barRef}>
                <span className={classes.FlatProgressBarStroke} ref={strokeRef} />
            </span>
            {nullable(showValue, () => (
                <Text size="xs" weight="bold" className={classes.FlatProgressBarValue}>
                    {Math.round(value)}%
                </Text>
            ))}
        </div>
    );
};

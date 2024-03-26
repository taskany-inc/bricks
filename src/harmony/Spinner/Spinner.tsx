import { IconLoaderOutline, BaseIconProps } from '@taskany/icons';
import React, { useMemo } from 'react';
import cn from 'classnames';

import classes from './Spinner.module.css';

interface SpinnerProps extends Omit<BaseIconProps, 'value'> {
    /** Amination duration in seconds */
    animationDuration?: number;
}

export const Spinner: React.FC<SpinnerProps> = ({ size, animationDuration = 2, className, ...rest }) => {
    const styles: Record<string, unknown> = useMemo(() => {
        return {
            '--spinner-animation-time': `${animationDuration}s`,
        };
    }, [size, animationDuration]);

    return (
        <span style={styles} className={cn(classes.Spinner, className)}>
            <span className={cn(classes.SpinnerInner)}>
                <IconLoaderOutline size={size} {...rest} />
            </span>
        </span>
    );
};

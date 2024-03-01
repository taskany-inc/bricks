import classNames from 'classnames';
import React from 'react';

import classes from './Counter.module.css';

const sizeMap = {
    xs: classes.CounterSize_xs,
    s: classes.CounterSize_s,
    m: classes.CounterSize_m,
} as const;

const viewMap = {
    default: classes.CounterView_default,
    primary: classes.CounterView_primary,
    danger: classes.CounterView_danger,
    warning: classes.CounterView_warn,
    checked: classes.CounterView_checked,
    ghost: classes.CounterView_default,
} as const;

interface CounterProps {
    count: number;
    view?: keyof typeof viewMap;
    size?: keyof typeof sizeMap;
    active?: boolean;
    className?: string;
}

export const Counter: React.FC<CounterProps> = ({ count, view = 'default', size = 's', active, className }) => {
    return (
        <span
            className={classNames(
                classes.Counter,
                { [classes.CounterActive]: active },
                viewMap[view],
                sizeMap[size],
                className,
            )}
        >
            {count}
        </span>
    );
};

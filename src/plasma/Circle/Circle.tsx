import React, { useMemo } from 'react';
import cn from 'classnames';

import { stringToColor } from '../../utils/stringToColor';

import classes from './Circle.module.css';

interface CircleProps extends React.HTMLAttributes<HTMLSpanElement> {
    string: string;
    size?: number;
    className?: string;
}

export const Circle: React.FC<React.PropsWithChildren<CircleProps>> = ({
    children,
    string,
    className,
    size = 120,
    ...attrs
}) => {
    const mainColor = stringToColor(string);

    const colorValue = useMemo(() => {
        const val = {
            '--circle-main-color': mainColor,
            '--circle-secondary-color': stringToColor(string.toUpperCase()),
        } as React.CSSProperties;

        return val;
    }, [string, mainColor]);

    const sizesStyle = {
        width: `${size}px`,
        height: `${size}px`,
        'line-height': `${size}px`,
        'font-size': `${size / 2}px`,
    };

    return (
        <span className={cn(classes.Circle, className)} {...attrs} style={{ ...colorValue, ...sizesStyle }}>
            {children}
        </span>
    );
};

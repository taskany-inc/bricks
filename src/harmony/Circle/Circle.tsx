import React, { useMemo } from 'react';
import cn from 'classnames';

import { isColorDark, stringToColor } from '../../utils/stringToColor';

import classes from './Circle.module.css';

interface CircleProps extends React.HTMLAttributes<HTMLSpanElement> {
    string: string;
    size?: 's' | 'm';
    className?: string;
}

export const Circle: React.FC<React.PropsWithChildren<CircleProps>> = ({
    children,
    string,
    className,
    size = 's',
    ...attrs
}) => {
    const mainColor = stringToColor(string);
    const isDark = isColorDark(mainColor);

    const colorValue = useMemo(() => {
        const val = {
            '--circle-main-color': mainColor,
            '--circle-secondary-color': stringToColor(string.toUpperCase()),
        } as React.CSSProperties;

        return val;
    }, [string, mainColor]);

    return (
        <div
            className={cn(classes.Circle, className, {
                [classes.CircleLighten]: !isDark,
                [classes.CircleDarken]: isDark,
                [classes.CircleSizeS]: size === 's',
                [classes.CircleSizeM]: size === 'm',
            })}
            {...attrs}
            style={colorValue}
        >
            {children}
        </div>
    );
};

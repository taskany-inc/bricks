import React, { useMemo } from 'react';
import classNames from 'classnames';

import classes from './Dot.module.css';

interface DotProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: 's' | 'm' | 'l';
    color?: string;
}

const sizeClass: Record<Required<DotProps>['size'], string> = {
    s: classes.DotSmall,
    m: classes.DotMedium,
    l: classes.DotLarge,
} as const;

export const Dot: React.FC<DotProps> = ({ size = 's', className, color, ...attrs }) => {
    const style = useMemo(() => {
        return color
            ? ({
                  '--dot-background': color,
              } as React.CSSProperties)
            : undefined;
    }, [color]);

    return <span className={classNames(classes.Dot, sizeClass[size], className)} style={style} {...attrs} />;
};

import React, { useMemo } from 'react';

import { Dot } from '../Dot/Dot';
import { Badge } from '../Badge/Badge';

import classes from './State.module.css';

interface StateProps {
    title?: string;
    color?: `var(--${string})`;
    short?: boolean;
}

export const State: React.FC<StateProps> = ({ title, color, short }) => {
    const dotColor = useMemo(() => {
        if (color) {
            return { '--state-color': color } as React.CSSProperties;
        }

        return undefined;
    }, [color]);
    return (
        <Badge
            iconLeft={<Dot size="l" className={classes.StateDot} style={dotColor} />}
            text={!short ? title : undefined}
            color={color}
        />
    );
};

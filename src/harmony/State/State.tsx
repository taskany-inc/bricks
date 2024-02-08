import React from 'react';

import { Dot } from '../Dot/Dot';
import { Badge } from '../Badge/Badge';

import s from './State.module.css';

interface StateProps extends React.HTMLAttributes<HTMLSpanElement> {
    title?: string;
    color?: string;
}

export const State = React.forwardRef<HTMLSpanElement, StateProps>(({ title, color, ...attrs }, ref) => {
    return (
        <Badge
            ref={ref}
            iconLeft={<Dot size="l" className={s.StateDot} color={color} />}
            text={title}
            color={color}
            {...attrs}
        />
    );
});

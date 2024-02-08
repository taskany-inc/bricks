import React from 'react';

import { Dot } from '../Dot/Dot';
import { Badge } from '../Badge/Badge';

import classes from './State.module.css';

interface StateProps {
    title?: string;
    color?: string;
}

export const State: React.FC<StateProps> = ({ title, color }) => {
    return <Badge iconLeft={<Dot size="l" className={classes.StateDot} color={color} />} text={title} color={color} />;
};

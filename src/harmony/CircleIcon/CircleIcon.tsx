import React, { ReactNode } from 'react';

import { Circle } from '../Circle/Circle';

import s from './CircleIcon.module.css';

interface HelpButtonProps {
    icon?: ReactNode;
    size?: 'xs' | 's' | 'm';
}

export const CircleIcon = React.memo(({ size = 'xs', icon }: HelpButtonProps) => (
    <Circle string="CircleIcon" size={size} className={s.CircleIconWrapper}>
        {icon}
    </Circle>
));

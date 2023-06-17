import React from 'react';
import icon from 'teenyicons/outline/tick-circle.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const TickCircleIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

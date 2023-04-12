import React from 'react';
import icon from 'teenyicons/outline/calendar.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const CalendarIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

import React from 'react';
import icon from 'teenyicons/outline/calendar-tick.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const CalendarTickIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

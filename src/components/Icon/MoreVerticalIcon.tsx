import React from 'react';
import icon from 'teenyicons/outline/more-vertical.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const MoreVerticalIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

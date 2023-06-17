import React from 'react';
import icon from 'teenyicons/outline/circle.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const CircleIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

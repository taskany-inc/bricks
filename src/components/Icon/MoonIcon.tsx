import React from 'react';
import icon from 'teenyicons/outline/moon.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const MoonIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

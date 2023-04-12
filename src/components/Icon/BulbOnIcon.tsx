import React from 'react';
import icon from 'teenyicons/outline/bulb-on.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const BulbOnIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

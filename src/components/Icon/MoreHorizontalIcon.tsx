import React from 'react';
import icon from 'teenyicons/outline/more-horizontal.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const MoreHorizontalIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

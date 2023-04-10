import React from 'react';
import icon from 'teenyicons/outline/bin.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const BinIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

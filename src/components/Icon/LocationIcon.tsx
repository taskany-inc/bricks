import React from 'react';
import icon from 'teenyicons/outline/location.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const LocationIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

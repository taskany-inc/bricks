import React from 'react';
import icon from 'teenyicons/outline/pin-alt.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const PinAltIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

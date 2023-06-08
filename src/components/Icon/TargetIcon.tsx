import React from 'react';
import icon from 'teenyicons/outline/target.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const TargetIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

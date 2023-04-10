import React from 'react';
import icon from 'teenyicons/outline/x.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const CrossIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

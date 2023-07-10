import React from 'react';
import icon from 'teenyicons/outline/add-small.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const AddSmallIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

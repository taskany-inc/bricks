import React from 'react';
import icon from 'teenyicons/outline/plus-circle.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const PlusIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

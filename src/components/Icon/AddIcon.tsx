import React from 'react';
import icon from 'teenyicons/outline/add.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const AddIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

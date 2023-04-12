import React from 'react';
import icon from 'teenyicons/outline/edit.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const EditIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

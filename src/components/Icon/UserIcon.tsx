import React from 'react';
import icon from 'teenyicons/outline/user.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const UserIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

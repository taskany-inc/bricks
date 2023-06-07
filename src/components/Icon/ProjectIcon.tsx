import React from 'react';
import icon from 'teenyicons/outline/users.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const ProjectIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

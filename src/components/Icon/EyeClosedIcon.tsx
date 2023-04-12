import React from 'react';
import icon from 'teenyicons/outline/eye-closed.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const EyeClosedIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

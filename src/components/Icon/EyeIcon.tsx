import React from 'react';
import icon from 'teenyicons/outline/eye.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const EyeIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

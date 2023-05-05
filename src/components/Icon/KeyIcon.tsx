import React from 'react';
import icon from 'teenyicons/outline/key.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const KeyIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

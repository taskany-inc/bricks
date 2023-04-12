import React from 'react';
import icon from 'teenyicons/outline/cog.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const CogIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

import React from 'react';
import icon from 'teenyicons/outline/git-compare.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const FlowIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

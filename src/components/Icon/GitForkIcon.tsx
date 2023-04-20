import React from 'react';
import icon from 'teenyicons/outline/git-fork.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const GitForkIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));
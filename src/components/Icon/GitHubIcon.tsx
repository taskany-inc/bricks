import React from 'react';
import icon from 'teenyicons/outline/github.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const GitHubIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

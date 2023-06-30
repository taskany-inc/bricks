import React from 'react';
import icon from 'teenyicons/outline/gitlab.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const GitLabIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

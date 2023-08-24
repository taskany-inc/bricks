import React from 'react';
import icon from 'teenyicons/outline/git-pull.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const TransferGroupIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

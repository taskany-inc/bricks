import React from 'react';
import icon from 'teenyicons/outline/divider-line.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const DividerLineIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

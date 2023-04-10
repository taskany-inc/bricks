import React from 'react';
import icon from 'teenyicons/solid/up-small.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const ArrowUpSmallIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

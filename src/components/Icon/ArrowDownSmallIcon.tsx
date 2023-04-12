import React from 'react';
import icon from 'teenyicons/solid/down-small.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const ArrowDownSmallIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

import React from 'react';
import icon from 'teenyicons/solid/arrow-right.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const ArrowRightIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

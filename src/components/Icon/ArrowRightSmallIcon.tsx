import React from 'react';
import icon from 'teenyicons/solid/arrow-right-small.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const ArrowRightSmallIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

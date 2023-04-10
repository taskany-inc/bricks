import React from 'react';
import icon from 'teenyicons/solid/star.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const StarFilledIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

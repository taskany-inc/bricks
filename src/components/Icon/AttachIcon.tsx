import React from 'react';
import icon from 'teenyicons/outline/attach.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const AttachIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

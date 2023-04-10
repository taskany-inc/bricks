import React from 'react';
import icon from 'teenyicons/outline/message.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const MessageIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

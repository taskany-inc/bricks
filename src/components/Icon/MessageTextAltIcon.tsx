import React from 'react';
import icon from 'teenyicons/outline/message-text-alt.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const MessageTextAltIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

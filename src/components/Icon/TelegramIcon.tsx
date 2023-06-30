import React from 'react';
import icon from 'teenyicons/outline/telegram.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const TelegramIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

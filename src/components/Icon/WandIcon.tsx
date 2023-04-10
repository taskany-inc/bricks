import React from 'react';
import icon from 'teenyicons/outline/wand.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const WandIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

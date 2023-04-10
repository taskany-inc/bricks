import React from 'react';
import icon from 'teenyicons/outline/clipboard-plus.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const ClipboardPlusIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

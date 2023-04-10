import React from 'react';
import icon from 'teenyicons/outline/mood-tongue.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const EmojiIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

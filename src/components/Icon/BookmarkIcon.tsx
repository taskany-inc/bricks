import React from 'react';
import icon from 'teenyicons/outline/bookmark.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const BookmarkIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

import React from 'react';
import icon from 'teenyicons/outline/search.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const SearchIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

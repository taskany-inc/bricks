import React from 'react';
import icon from 'teenyicons/outline/markdown.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const MarkdownIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

import React from 'react';
import icon from 'teenyicons/outline/file.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const FileIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>((props, ref) => (
    <BaseIcon value={icon} ref={ref} {...props} />
));

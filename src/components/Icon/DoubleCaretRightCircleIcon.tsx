import React from 'react';
import icon from 'teenyicons/solid/double-caret-right-circle.svg';

import { BaseIcon, BaseIconProps } from './BaseIcon';

export const DoubleCaretRightCircleIcon = React.forwardRef<HTMLSpanElement, Omit<BaseIconProps, 'value'>>(
    (props, ref) => <BaseIcon value={icon} ref={ref} {...props} />,
);
